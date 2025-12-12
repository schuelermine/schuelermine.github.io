---
layout: blogpost.html
title: C array types are weird; and related topics
description: C array types are weird. In this article I’ll explain what I find weird about them, what I’d do differently, and ramble on a few related things.
---

<nav id="left-comment">

_There’s no table of contents for this article, it’s not structured yet._

</nav>

<article id="main-content">

C array types are weird.

In this article I’ll explain what I find weird about them, what I’d do differently, and ramble on a few related things.

Technically speaking, an array type `T[n]` (for some _n_) is distinct from a pointer type `T *`. A value of type `T[n]` represents a contiguous sequence of `T` values in memory, _n_ long.

But you can’t actually refer to values of type `T[n]`. Any expression that would be of that type is immediately converted to a pointer, type `T *`, namely a pointer to the first element.

Since the array indexing operator `arr[ix]` actually operates on pointers, acting like `*(arr + ix)`, you can basically treat arrays like pointers.

The only (important) instance where this _doesn’t_ happen is in `sizeof arr`, which returns `sizeof(T)` × _n_.

```c
int arr[3] = {10, 20, 30};
int *arr_ptr = arr;
size_t arr_size = sizeof(arr);
size_t ptr_size = sizeof(arr_ptr);
// These may (and likely will) be different
```

Additionally, in function signatures, any array type you give to an argument is actually interpreted as a pointer instead. The _n_ denoting the size is completely discarded. That means that, as an exception to the exception, `sizeof arr` in a function with an argument `T arr[]` will _not_ evaluate to `sizeof(T)` × _n_.

```c
size_t foo(char buf[]) {
    return sizeof(buf);
}

char msg[] = "Whereas recognition of the inherent dignity";
size_t msg_size = sizeof(msg);
size_t msg_size_in_fn = foo(msg);
// These may (and likely will) be different
```

Interestingly, there’s a second type in C that acts very similar, but doesn’t cause nearly as many problems. That type is functions.

Like arrays, function values immediately coerce to function pointers. Unlike arrays, however, dereferencing a variable that refers to a function, e.g. `*fn`, does allow you to call that function in the same way as the plain symbol would.

```c
void foo() {}
(*foo)();
foo();
```

While writing `&arr` for an array does actually give you a pointer-to-array type `T (*)[n]`, `&fn` is completely equivalent to `fn`.

Additionally, writing `T fn()` or `T (*fn)()` in function argument lists is also the same—the second gets automatically corrected to the first, very much like array types being automatically corrected to pointer types.

Fundamentally, an array type is similar to a struct with all members being of the same type. But arrays are often used in a way that structs aren’t. We rarely get the address of the second member of a struct. This is probably because an array with its head shifted remains an array, just of a different size. Since we often ignore, or are ignorant of, the size of an array, this is a natural way to deal with arrays.

I think it would’ve been much easier to mentally model the situation if C had employed a strict separation of arrays and pointers.

Arrays should act just like structs. Passing a `char[5]` to a function should pass the actual five values in the array. It should be like having five `char` arguments to the function.

A pointer to an array would therefore involve only one level of indirection. If you wanted to treat an array like a pointer, you’d have to manually write `&arr[0]` to get a pointer to the first element of `arr`.

The most obvious immediate benefit is that this makes the language less confusing to learn. It’s very easy to be confused, as a beginner, by the fact that writing to an array inside a function does change the array outside the function, but the same isn’t true for structs.

Normally, the presence of references makes this delightfully explicit and easy to understand in C. In fact, C is, in this respect, much simpler and easier to understand than languages like Python, where objects are pointers by default, and C++, where an argument may be passed by reference depending on the function signature without any change to the call site.

The most immediate downside is that the arrays are being copied all the time. I don’t think that necessarily detracts from the idea. It would just mean that you have to be smart about using it, and it would give the programmer more choices, not less. (Still not as overwhelmingly many choices as something like C++, in case you’re worried about that)

The compiler could, of course, also choose to implement these arrays using pointers, even selectively, when it suits its purposes. That could leave the more intuitive semantics intact.

But how would you construct such an array from a pointer? Writing `(char[3]){*arr, *(arr + 1), *(arr + 2)}` would be very tedious indeed. Luckily, there is prior art for this.

GDB, the debugger, has an expression system, and it extends C’s syntax with the `@` operator, used to imbue a memory address with a length to make it an array.

However, it doesn’t actually take a memory address as its operand. Rather, it acts on expressions like `*ptr`, which _have_ an address, instead of ones that _are_ an address.

This is analogous to how things like `=` already work. We can write `*ptr = 2`, since `*ptr` is not just a value, but a value with a particular location in memory that can be written to. You cannot write `2 = 2`. We call these expressions _place expressions_, or _lvalues_.

Similarly, you write `*ptr@10` to get an array whose first element is `*ptr` and has 9 elements after that. But you cannot write `2@10`.

I think this is a neat way for this operator to work. It could in theory allow for things like
```c
struct coords_3d {
	int x;
	int y;
	int z;
} some_point;
struct coords_2d {
	int x;
	int y;
} some_point_projected = some_point.x@2;
```

This feels a bit unnatural in this case due to the fact that, unlike arrays, a part of a struct type isn’t really quite as easy to relate to the original struct type. We rarely deal with structs where we know some prefix of them, which might be analogous to an array where we don’t know the size.

The way in which we understand arrays of unknown size as a pointer is, in fact, an example of a broader pattern, where we hide some object we can’t deal with directly behind some opaque handle. Then, we have some way of supplying the missing information to actually operate on the object.

In a C array, that missing information may be the length, which is then supplied from any number of sources.

We may store that information alongside the array, either in memory, next to the array, but at a static offset, or alongside the pointer in our local variables.

Storing it together with the pointer in our local variables is what we call a wide pointer. This is e.g. how `std::vector` in C++ may be implemented, and it’s what Rust uses automatically to let you take references to unsized types like arrays, `&[T]`, that automatically store their length.

We’re effectively already doing this in C whenever we take parameters like `size_t len, char *buf`.  Taking two arguments is equivalent to taking a two-member struct, and that two-member struct, if we were to extract it as its own type, is a wide pointer.

Storing that additional data in memory just before the actual data is what e.g. C++ derived classes with virtual methods do. <sup><a href="#footnote-1" id="footnote-1-ref-1">Footnote 1</a></sup>

Getting back to my improved C arrays, you could therefore convert back and forth like this:
```c
char arr[4] = {'x', 'y', 'z', 'w'};
char *arr_ptr = &arr[0];
char arr_again[4] = *arr_ptr@4;
```

Slicing an array is very natural in this syntax:
```c
int iota[4] = {0, 1, 2, 3};
int one_two[2] = iota[1]@2;
```

Obviously, it would be equally possible to have the syntax `ptr@n` instead, without needing the dereference. You could still write something like `(&iota[2])@3`. I think it looks less nice though, and gives you less insight about how place expressions and the like work.

One problem is that you have to know the length. If you’re just shifting the beginning of the array, you write:
```c
int arr[2] = {10, 20};
arr = &arr[1]@1;
```

But that requires stating the new length explicitly. If you have some kind of operator to get the array size defined like `sizeof(arr)/sizeof(T)`, you could use that. It’s tedious and ugly nonetheless.

The three obvious solutions are to either allow `arr + 1`, or to automatically infer the length with a special syntax, e.g. `arr[1]@...`, or to make a new custom operator, e.g. `arr +@ 1`.

Since I can’t actually redesign C, and I’m not currently writing a new language, and this probably isn’t that common, I’ll give no specific recommendation.

As a last note, I’ll mention the `->` operator. That one is similar to the `@` operator in that whether it deals in pointers or place expressions is kind of arbitrary.

Right now, the expression `ptr->foo` denotes _the value_ `(*ptr).foo`, with a dereference included for free. To get the address, you write `&ptr->foo`. But it could’ve just as easily been defined as `&(*ptr).foo`. Then, to get the value, you’d write `*ptr->foo`.

Right now, to get nested values from pointers to structs, you write `ptr->foo.bar`. With the alternate `->`, you’d write `ptr->foo->bar` (for the pointer).

One might say that `ptr->foo.bar` shows that there’s only actually one pointer being followed, and `ptr->foo` isn’t itself a pointer. But the alternate syntax would show that too, since you’d write `*ptr->foo->bar` to actually get at the value.

This is a very ill-substantiated feeling, and possibly entirely wrong, but I have a very slight preference for `ptr->foo->bar`. Working entirely in the realm of pointers is, to me, slightly more reflective of the fact that the compiler only actually has to apply one offset.

But `ptr->foo.bar` is more reflective of the neat interplay between place expressions, the dereference operator, and the address-of operator. Since I praised that so much above, perhaps that feeling is hypocritical.

<aside id="footnotes">

<h2> Footnotes </h2>

<ol>

<li id="footnote-1">

See [this video by YouTuber Logan Smith on C++ and Rust's dynamic dispatch](https://www.youtube.com/watch?v=wU8hQvU8aKM) for more details on this topic.
[Go back to text](#footnote-1-ref-1)

</li>

</ol>

</aside>

</article>
