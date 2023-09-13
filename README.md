> The original plan is to use Karma3 api(lens algorithm api). I did build the concept out and made it work( [consumer contract](https://mumbai.polygonscan.com/address/0xa8b024f2622d89456018a3f5a8bc834b9fb8215e), and [video when it's still working](https://www.youtube.com/watch?v=WrLH3gKIidQ) ). However, maybe due to too frequent requests, I get 403 error(request forbidden) now. According to the product logic, I managed to build a similar project but with lens api. But I really like the original project using Karma3, it has depth both in product or technique, and it was proven to be functional. Besides, the two projects are very similar, so I would keep the original README for the original project and add what's changed.

# PhatStrategy
An on-chain strategy game that's leveraging [Karma3 api(changed lens api now)](https://openapi.lens.k3l.io/) and phat function. It's a two-players game, so call your friend, bet few Matics, compete your strategies and enjoy the exertion of wisdom.

[Demo Video(original project with karma3 api)](https://www.youtube.com/watch?v=WrLH3gKIidQ)

[Demo Video(with lens api,only firsthand's assignments' format changed in the frontend)](https://youtu.be/H3bQjRgwXS4) 

[Live Demo(currently working project with lens api)](https://phata-strategy.vercel.app/) 



|||
|-|-|
|mumbai testnet address(original)|[0xa8b024F2622D89456018A3F5A8bc834b9FB8215E](https://mumbai.polygonscan.com/address/0xa8b024f2622d89456018a3f5a8bc834b9fb8215e)|
|mumbai testnet address(with lens api|[0x72EfA99059F29e87340d153aB12CCc0E562985e9](https://mumbai.polygonscan.com/address/0x72EfA99059F29e87340d153aB12CCc0E562985e9)|
|polygon mainnet address|[0xA6d74171bD5592ba4295F299887222fd996Dc16E](https://polygonscan.com/address/0xa6d74171bd5592ba4295f299887222fd996dc16e)|

## Game Rules and process
Basically, firsthand assign two lens handles, and the one who's assigned the handle with higher score of [Karma3 profile score](https://docs.karma3labs.com/decentralized-social/lens-protocol) wins and get all the stakes apart of 1% fees. However, both firsthand and secondhand can choose to reverse or not. If only one person choose to reverse, then the one with lower score will win, if no one or both choose to reverse, then higher scored one still wins. And the score from Karma3 algorithm can be from "engagement" or "creator" strategy, they'll be randomly used with equal chances. (more detailed explanation is on *How's it designed* part). 
*changes in the project with lens* Firsthand need to assign profileId(hex) instead of handles, and Phat Function will retrieve following and follower number of the two given profileId, then randomly choose to compare following or follower number, and the higher number wins.

### Some concepts you may need to know before learning the process
- salt: since on-chain data is public and value of move is few(Null,Reverse,Keep), salt is a cryptographically secure random uint256 value to help protect the firsthand's move from being known. It's generated and saved only in the browser, so firsthand should save it in time after commited its move.
- fees: each round(from firsthand started the game to stakes being distributed) will cost 1% of the total stake, the fees will be paid from the secondhand since the firsthand need to pay more gas fees in the game and only used for maintainness on Phala network.

### Process
1. Firsthand start the game, assign the two handles(profileId in project with lens), stake some money and commit firsthand's move(reverse or keep).
2. Firsthand save the salt.
3. Secondhand stake the same amount of money, pay the fees and make the move and send request to Phala.
4. A random strategy, "engagement" or "creator", will be chosen and Karma3 API will be called accordingly. Compare the scores recieved from Karma3 and return the which handle gets higher score. (if one handle doesn't exist or something goes wrong in the process, the round will be considered "TIE"). *changes in the project with lens*: what the compete number will based, following or flower will be randomly chosen, compare the numbers according to randomly chosen following/flower and return which profileId gets higher number.  
6. Firsthand reveal the salt and move, the result being resolved.

**Timeout mechanism: a timeout time: 5 minutes is set(1 minute for testnet). If the secondhand doesn't move after timeout, firsthand can retrieve its money. And if firsthand doesn't resolve after timeout, since the firsthand's awared of the result now and could apply the delaying strategy to prevent secondhand recieving the awards, the secondhand will be considered as winner and will be rewarded all the stakes.**

## How's it designed
Karma3 algorithm scores every profile in lens ecosystem every hour. It offers various strategies to evaluate profiles from different angles and is actively used in numerous dapps built on Lens. This makes it a wonderful source for game design. Players are familiar and recognize with the score source,albeit to varying degrees, same inputs may yield different results so players need to come up with new inputs(strategy), and both the algorithm and its association with lens can provide us more space for game design and players' strategy making. However, it's hard to build an on-chain game with it since it's offhcain data, especially on-chain game is emphasized on automation and decentralized. That's where Phala Function steps in. By leveraging Phala Network, PhatStrategy is able to use data from Karma3 api decentralizedly and it intergrates smoothly with on-chain process.
*Why then choose the lens api as alternative*: same reasons with Karma3 api. Players are familiar and recognize the data, and following&follower numbers of lens api change with time, have association with lens and are suitable to be randomly chosen which one to be used.

However, purely using scores from Karma3 to compete isn't enough for a game, it's not fun. And to make a game playful, two extreme situations should be avoided:

* Nash Equilibrium(don't care so much on the term), it's a situation that players coundn't gain more by purely change its strategy (no matter how smart you're and what a great strategy you come up with, you won't get better chance to win, it's a pure random&luck game). Players get bored soon with such a situation.
* Strictly dominant strategy existed, for example, without the reverse mechanism in PhatStrategy, the firsthand can always win and nobody would want to play as secondhand.

As said, in the game, the reverse mechanism is introduced to prevent the second situation. And to prevent the first situation, firsthand's rendered the privilege to assign the handles in the beginning, it's the essential part to make the game playful. Firshand can set one handle has higher scores on both "engagement" and "creator" strategy of Karma3, so firsthand reduced the randomness of Karma3 manually and is purely betting on whether or not the secondhand will reverse, which the familiarity between the two players can be used for the move prediction for secondhand. And for secondhand, since on-chain&Karma3 is public, secondhand can analize firsthand's strategy and react accordingly. Furthermore, the association with lens can also be used for your strategies making. 

So what're the strategies in your mind? Though still limited compared to production game, but you do have a space to extert your wisdom and win some money😎

