---
layout: writing.html
title: My definition of a roguelike
description: A cautious and general and unnecessary definition of roguelike
---

<div id="left-comment">

- [Being mechanically roguelike](#being-mechanically-roguelike)
- [Being prototypically roguelike](#being-prototypically-roguelike)

</div>

<article id="main-content">

# My definition of a roguelike

I consider whether a game is roguelike on two axes:

- How prototypically roguelike is it?  
  This asks how many characteristic incidental features of
  [_Rogue_](https://en.wikipedia.org/wiki/Rogue_(video_game)) the game shares.  
  A game can only be prototypically roguelike to some degree—there are no exclusion criteria.
- How mechanically roguelike is it?  
  This asks how many characteristic features that nowadays define the genre the game has.  
  A game can strictly fail to be mechanically roguelike—there are exclusion criteria.

Even if a game is strictly not mechanically rogulike, it may be highly prototypically roguelike.  
A game, here, may be a particular configuration of a game, or a game played in a specific manner,
or a specific part of a game.

## Being mechanically roguelike

There are three **strict** criteria for being mechanically roguelike.
Failing to meet them excludes a game from being mechanically roguelike.

- Gameplay can be divided into _runs_, possibly interspersed by other gameplay.
- There is a practically unlimited number of runs.
- Runs can end in a defined success or failure state. There may be different types of success or failure.

It is possible to classify a game differently depending on how runs are defined.
Often, there is a natural or common notion of runs that is most readily identified,
but sometimes, an interesting different classification is reached by redefining a run.  
Here, gameplay is taken to allow for repeated initializations of the game,
and interruption or suspension of the game. Perspectives may also differ in how gameplay
is delimited.

There are two criteria that determine the degree to which a game is mechanically roguelike,
if it satisfies the above strict criteria.

- A large part of the non-system content of each run is unpredictable.  
  The more that can be predicted, the less mechanically roguelike.  
  Predictability from player actions in previous runs detracts more
  from being mechanically roguelike than predictability from game-supplied
  run content in previous runs, which detracts more from being mechanically
  roguelike than predictability which is independent of previous runs.
- There is little one can do in any specific run that significantly improves
  the likelihood or difficulty of achieving a success state in a following run.  
  The more that can be done, the easier it is, and the more it improves future runs,
  the less mechanically roguelike.  
  The less can be known about the nature of the effect and the less can be known about
  which runs it improves the less it detracts from being mechanically roguelike.  
  An effect of a similar magnitude in sum that is spread over a large number of runs
  (e.g. improves the chance of succeeding within a broader range of runs, but to
  the same degree) detracts less from being mechanically roguelike than a focussed effect.  
  If an effect applies to all future runs (isn’t bounded), it detracts less from
  being mechanically roguelike.

## Being prototypically roguelike

Being prototypically roguelike is an amalgamation of yet more axes.
Here I list named stages per axis in order from most prototypically roguelike to least.
All criteria are more relevant as they apply to the runs
(should the game be mechanically roguelike).

- Characters
  - There is a single player character.
  - There are multiple player characters, or there is no player character.
- Players
  - There is only one player.
  - There are multiple players.
- Fundamental gameplay context
  - The gameplay involves manipulating actors in a 2D grid.
  - The gameplay involves manipulating actors in a discretized 2D space.
  - The gameplay involves manipulating actors in a 2D space.
  - The gameplay involves manipulating actors in an n-dimensional space.
  - The gameplay is not best described as manipulating actors in space.
- Graphics
  - The game is played in a terminal.
  - The graphics are a grid of ASCII symbols.
  - The graphics consist of ASCII or abstract symbols.
  - The graphics are abstract, geometric, or highly stylized.
  - The graphics are stylized but clearly representational.
  - The graphics are highly realistic.
- Gameplay actions
  - The game is turn-based.
  - The game consists mostly of clearly identifiable discrete steps,
    each of which has no time limit.
  - The game consists mostly of clearly identifiable discrete steps.
  - The game can be paused indefinitely.
  - The game provides ample time to ignore the game.
  - The game provides ample time during which the game is not demanding of the player
    (if they wish to succeed in a run).
  - The game is constantly high-stakes or demanding of the player.
- Saving
  - There is no usually available method to return to any given previous state,
    as long as that state was in some way marked or saved.
  - There is a usually available method to return to most given previous states,
    but it is difficult to access.
  - There is a usually available method to return to most given previous states.
  - There is a universal method to return to most given previous states.
  - You can go back in time.

</article>
