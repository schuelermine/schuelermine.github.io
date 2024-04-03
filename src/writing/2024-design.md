---
layout: writing.html
title: Idealistic principles for computer software design
description: >
    Highly idealistic principles for novel computre software design,
    advocating for rebuilding much of our shared infrastructure
---

<div id="left-comment">

- [Enforce and maintain the structure of data](#enforce-and-maintain-the-structure-of-data)
- [Be generic everywhere else](#be-generic-everywhere-else)
- [Trust the user and no-one else](#trust-the-user-and-no-one-else)
- [A note: Nothing is simple, nothing is direct](#a-note-nothing-is-simple-nothing-is-direct)
- [Putting it all together](#putting-it-all-together)
- [What needs to be rebuilt](#what-needs-to-be-rebuilt)

</div>

<article id="main-content">

# Idealistic principles for computer software design

This is a list of idealistic principles which I dream of being standard in computer software design.
This is, in particular, a critique of contemporary Linux.
While Linux does address many of the issues mentioned here with many features,
these are band-aids and duct tape; a system must be built which adheres to these as core principles,
from the ground up.

## Enforce and maintain the structure of data

Much data we interact with is structured. This is to mean that there are certain things we know about it,
and certain things we want to do with it. The systems that support our programs, and our programs themselves,
should be designed to make it easy to operate on this data in ways that preserve and utilize our knowledge
as much as possible, and the data we operate on should be stored in a format that makes it as easy as possible
to obtain this knowledge and perform the desired operations.

The knowledge should, insofar that is possible, be static, that is, it should be readily accessible while being
as unobtrusively indicated as possible. The best way to achieve this is for the knowledge to be inherent
in the program execution.

Since it is always possible to lose knowledge, and it is often necessary to do so,
specific and semantically relevant operations should be the default in most situations,
to avoid spreading such behavior inadvertently.

In practice this means we should not serialize data unless necessary,
that we should use static typing or explicit markers, and that we should use and design domain-, format-,
and application-specific interfaces and operations on data.

When we interact with other programs, we must also provide an interface that follows this principle.
We must not allow the other program to break invariants, if this is not requested.
Links and contexts must be maintained.

Data can refer to other data. In this case, it is vital to know where this data comes from.
In what context references are valid should be considered an invariant of them.
This means that we should enforce that data is accessed correctly via references,
whether statically or dynamically.

In practice this means RAII, pointer tagging, extra indirection towards managed references,
or meddling in another process’ data.

We can extend this principle to larger matters:  
What is a file but unstructured data with a generic interface?  
What is an extension but a poor guarantee of format?  
What is a path but an unstructured reference?

## Be generic everywhere else

A corollary of the focus on knowing what your data is is knowing what you don’t know or need to know
about your data. If it is possible, make your program work with any data for which your processing is
applicable and meaningful. To this end, systems should support automatic specialization to mitigate dispatch
penalties.

To increase the flexibility of the system, the power of the user, and to allow interoperability with code
not designed this way, we should support shimming and mocking data and processes. All interfaces, even if
they seem intrinsic to something, should be replaceable, e.g. pointers or structures.
Because of this we should avoid requiring or assuming any global state, since this makes it harder to shim it.

We must, however, not fall for the trap of trying to force everything into the same interface.
The program must be as specific as it needs to be to be semantically sound, and to work well.
It is then the job of the supporting system to extend this to be flexible for the user.

In practice this means virtual file systems, modelling most things as procedure calls, and virtualization.

We can extend this principle to larger matters:  
What is a file system but global state?  
What is a device driver but global state?  
What is piping but the ability to shim files?  
What is a special file but a wrongfully generic interface?  
What is C but a language without generics?

## Trust the user and no-one else

The user should have absolute control over their system. Even functionality designed to protect the user
must have a bypass. Components that stray from this, even if for the better, must be carefully evaluated,
and it must be enforced that their applications can be bypassed.

As part of giving the user as much control as possible, authorities such as the user should be able to
migrate data from one context to another without the application noticing. In other words,
the program cannot own its data, the user must.

On the other hand, no program should ever have any permissions whatsoever unless explicitly given.
To this end the user must be given powerful, extensive tools to manage automatic permissions,
and should be reminded or alerted of likely mishaps.
The restrictions on a program should extend to any and all hardware access, except perhaps vital computing
resources, but then with a conservative limit.

Additionally, no program should trust another program to do the right thing.
There should be a trust cascade where the system is trusted to do the right thing,
which allows it to trust other programs with input from the user, and so on.
There need to be different types of trust, and trust must be traceable and revocable.
Trust by proxy is lesser than direct trust by the user.
We must also not trust untrusted programs to trust our trust data.

The flow of data must be carefully monitored to avoid crossing trust or permission boundaries,
to avoid confused deputies. We should even prevent highly privileged programs from accessing data
that is accessible by lower privilege programs.

To enforce all this, in a flexible manner, we must treat trust and permission with high granularity,
both in the permissions themselves as well as what they apply to.

In practice this means capabilities, isolation, datapoint-level, argument-specific, instruction-level
granularity, and parallel execution.

We can possibly extend such security considerations to the hardware design.

## A note: Nothing is simple, nothing is direct

Advocates for a more primitive style of computing argue that we must have direct access to the hardware,
that we must deal with plain text files, that we must use simple interfaces.

Nothing is that simple. Ever since we moved beyond directly manipulating bits in the memory via vacuum tubes,
arguably, since we first plucked numbers from the ether, there has been no direct access, no raw data,
and consequently, there has been a need for complex interfaces.

Mathematics has long known that abstraction is key. When we yanked the integers from under its nose,
we became destined to follow that path. At the onset we used our first, simple tools, but we, too,
must and have recognized that an interconnected web of supporting machinery is needed to work effectively.

The greatest myth that has reared its ugly head in this space is that of plain text.
It is purported to be universal to camouflage as a suitable base for computing. It replaced the more real,
more universal raw binary, and has thereby lured us into an age where we are no longer benefitting from the
simplicity of interacting with raw data, nor from the comfort that structured interfaces give us.

Either we must write code as close to the raw data as tenable,
or we must raise our abstraction floor ever higher. The former is untenable for many projects.

## Putting it all together

<blockquote>

**Note:** This part of the document is the weakest, in my view.
I should’ve done a better job at articulating this.

</blockquote>

The ideal system must reject all legacy. We must stand bold in the face of adversity and tolerate barriers in
backward compatibility, except as necessary for giving the user control.

There shall be no file system. There shall be no global device list. There shall be no default I/O.

Instead, the OS manages resources. The initial resources are all things the OS has direct access to.
Then, some predefined initial resource is created.
Resources can project resources dervied from them, possibly in the context of another resource.
Programs are simply executable resources. To interact with a resource, a running program
transfers control (possibly under stipulations) to another executable resource projected from the resource
it wants to interact with.
Resources can also be in the context of another resource, which mediates access to all other resources.

The execution context of a program is also a resource—essentially, a running program is a projection
from its executable resource (the instructions) and stack and heap, which are themselves projections from
whatever resource corresponds to the backing memory.

The user is also a resource. It is a projection, from a trusted user management resource, in the context of
the input devices. This allows is to have multiple users active at different or the same input devices.

I/O is interpreted semantically as early as possible. By default, when given access to the keyboard,
programs merely request a text entry context, and otherwise try to register shortcuts.
Things like undo or copy are managed session-wide.

Program data is managed by requesting storage from some storage provider. The data to be stored is richly
embellished with metadata. This metadata, as well as the program, can be used by the user to retrieve the data
manually, but the program uses an abstract handle that is tracked as foreign data.

Storage can be provided from a disk, the network, memory, or a combination. Any of these can also be split into
multiple storage providers. When requesting storage, a preference can be given about the nature of the storage,
but this can be overridden by the user.

To make all this user-friendly, there needs to be a GUI for every aspect of the system,
and there should be no command-line or plain text configuration files. Everything must be structured.

Especially since this system is novel in most ways, but also because this has been neglected by current systems,
special care should be taken to educate the completely unfamiliar on the system, to achieve a useful, correct,
and extensive mental model quickly.

## What needs to be rebuilt

Everything. That includes:
- Hardware designs
- Boot sequences
- Firmware
- Communication protocols, incl. networking
- Standards for hardware, e.g. displays, HID
- File systems or whatever replaces them
- Compilers
- Distribution and deployment infrastructure
- Development environments
- Programming languages and editors
- Applications, local or remote
- Desktop user interfaces
- Libraries
- Program execution models

</article>
