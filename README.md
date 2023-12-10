
# PhatStrategy
An on-chain strategy game that's leveraging [Karma3 api(changed lens api now)](https://openapi.lens.k3l.io/) and phat function. It's a two-players game, so call your friend, bet few Matics, compete your strategies and enjoy the exertion of wisdom.

[Demo Video(original project with karma3 api)](https://www.youtube.com/watch?v=WrLH3gKIidQ)

[Live Demo(currently working lens api project, testnet)](https://phata-strategy.vercel.app/) 

Detailed configuration in the README of frontend/contracts' own folder 

## Game Rules and process
Basically, firsthand assign two lens handles, and the one who's assigned the handle with higher score from [Karma3 profile score](https://docs.karma3labs.com/decentralized-social/lens-protocol) wins and get all the stakes apart of 1% fees. However, both firsthand and secondhand can choose to reverse or not. If only one person choose to reverse, then the result will be reversed and the one with lower score will win, if no one or both choose to reverse, then the result won't be reversed and higher scored one still wins. And the score from Karma3 algorithm can be from "engagement" or "creator" strategy, they'll be randomly used with equal chances. (more detailed explanation is on *How's it designed* part). 

**changes in the project with lens api:**
Instead of using handles,firsthand need to assign profileIds in hexadecimal format in the beginning. The Phat Function will fetch following and follower numbers of the two given profileId, then randomly selects whether to compare the following or follower number, with the higher number determining the winner. The reverse mechanism remains the same.

### Some concepts you may need to know before learning the process
- salt: since on-chain data is public and value of move is few(Null,Reverse,Keep), salt is a cryptographically secure random uint256 value to help protect the firsthand's move from being known. It's generated and saved only in the browser, so firsthand should save it in time after commited its move.
- fees: each round(from firsthand started the game to stakes being distributed) will cost 1% of the total stake, the fees will be paid from the secondhand since the firsthand need to pay more gas fees in the game and only used for maintainness on Phala network.

### Process
1. Firsthand start the game, assign the two handles(hexadecimal profileId in current Lens Api project), stake some money and commit firsthand's move(reverse or keep).
2. Firsthand save the salt.
3. Secondhand stake the same amount of money, pay the 1%fees and make the move(reverse or not) and send request.
4. In Phat Function, either 'engagement' or 'creator' strategy as the competing basis will be randomly selected. Then, based on the selected strategy the Phat Function will use the Karma3 API to fetch scores for two given handles, compares them, and determines whether 'firsthand' or 'secondhand' has the higher score. If any issues arise during this process, the round will be considered a 'TIE.'
*Changes in current Lens project:* the competition is based on randomly selecting either 'following' or 'follower' numbers as the basis. The Phat Function retrieves related data from Lens API, compares these numbers for the two provided profile IDs and determines whether 'firsthand' or 'secondhand' is assigned the profile ID with the higher number.
6. Firsthand reveal the salt and move, the result being resolved, and all stakes will be sent to the winner or splited when it's TIE.

**Timeout mechanism: a timeout time: 5 minutes is set. If the secondhand doesn't move after timeout, firsthand can retrieve its money. And if firsthand doesn't resolve after timeout, since the firsthand's awared of the result now and could apply the delaying strategy to prevent secondhand recieving the awards, the secondhand will be considered as winner and will be rewarded all the stakes.**

## How's it designed
Karma3 algorithm scores every profile in lens ecosystem every hour. It offers various strategies to evaluate profiles from different angles and is actively used in numerous dapps built on Lens. This makes it a wonderful source for game design. Players are familiar and recognize with the score source,albeit to varying degrees, same inputs may yield different results so players need to come up with new inputs(strategy), and both the algorithm and its association with lens can provide us more space for game design and players' strategy making. However, it's hard to build an on-chain game with it since it's offhcain data, especially on-chain game is emphasized on automation and decentralized. That's where Phala Function steps in. By leveraging Phala Network, PhatStrategy is able to use data from Karma3 api decentralizedly and it intergrates smoothly with on-chain process.

*Why then choose the lens api as alternative*: same reasons with Karma3 api. Players are familiar and recognize the competing data, the following&follower numbers of lens api change with time, are suitable to be randomly chosen which one to be based and have association with lens, which provides space for player's strategy designing, requires players to refresh their strategies and makes the game more playful.

However, purely using scores from Karma3/lens to compete isn't enough for a game, it's not fun. And to make a game playful, two extreme situations should be avoided:

* Nash Equilibrium(don't care so much on the term), it's a situation that players coundn't gain more by purely change its strategy (no matter how smart you're and what a great strategy you come up with, you won't get better chance to win, it's a pure random&luck game). Players get bored soon with such a situation.
* Strictly dominant strategy existed, for example, without the reverse mechanism in PhatStrategy, the firsthand can always win and nobody would want to play as secondhand.

As said, in the game, the reverse mechanism is introduced to prevent the second situation. And to prevent the first situation, firsthand's rendered the privilege to assign the handles/profileIds in the beginning, it's the essential part to make the game playful. Firshand can set one handle has higher scores on both "engagement" and "creator" strategy of Karma3/(have higher number in both following/follower), so firsthand reduced the randomness of competing based data manually and is purely betting on whether or not the secondhand will reverse, which the familiarity between the two players can be used for the move prediction for secondhand. And for secondhand, since on-chain&Karma3/lens data is public, secondhand can analize firsthand's strategy and react accordingly. Furthermore, the association with lens can also be used for your strategies making(who's your competitor admiring or hating? assign the handle/profileId to your competitor/yourself). 

So what're the strategies in your mind? Though still limited compared to production game, but you do have a space to extert your wisdom and win some money😎


||consumer address|lens oracle endpoint|
|-|-|-|
|mumbai testnet address(original)|[0xa8b024F2622D89456018A3F5A8bc834b9FB8215E](https://mumbai.polygonscan.com/address/0xa8b024F2622D89456018A3F5A8bc834b9FB8215E)|0x600951d64bea76d39fba9c9529b5e6e51f61883f|
|mumbai testnet address(currently working lens api project)|[0x72EfA99059F29e87340d153aB12CCc0E562985e9](https://mumbai.polygonscan.com/address/0x72EfA99059F29e87340d153aB12CCc0E562985e9)|0x522ed09cdc771ac9c987946cd64b316182a9d67d|

