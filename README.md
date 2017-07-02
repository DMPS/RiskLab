# RiskLab

RiskLab is a text adventure about actuarial mathematics made using NodeJS.

## Server

The server is an extremely simple Node.js file. It fires up an instance of an Express server on port 3000 to which it serves the Terminal. All AJAX requests made to it are quickly passed to the Console to be executed. Responses are then dispatched back to the Terminal. To get TextAdventure up and running on port 3000 simply run the following command from the project's folder:

```
node server.js
```

##Commands

### `die` Command

`die` deletes the user's current game and returns a message to the user.

### `drop` Command

`drop` checks to see if the `player` has an item in their `inventory` that matches the command's subject. If so the item is removed from the `player`'s `inventory` and is added to the player's current location's items. A confirmation message or a failure message is passed back to the user.

### `go` Command

`go` checks to see if the command's subject matches one of the room's exits. The player's new current location's description is returned if this is the first time the player has visited this location, otherwise the location's room is returned. A failure message is displayed if the user fails to provide a subject that matches an exit.

### `inventory` Command

`inventory` returns an enumerated list of all the items contained in the player's inventory.

### `load` Command

`load` will only run if the player is not currently playing a game. Similarly, `load` is the only command a player can execute if they are not currently playing a game. `load` copies the content of the cartridge file that matches the subject into the list of active games maintained by the Console and assigns it to the user.

### `look` Command

`look` will return the player's current room's description if the subject is not passed to it. If a subject is passed to it `look` instead attempts to return the description of the item in the player's inventory matching the description. Failing that, `look` attempts to return the description of the matching item in the player's current room. Finally, if that fails it attempts to return the look interaction of the matching interactable in the player's current room. 

### `take` Command

`take` checks to see if the player's current location has an item that matches the command's subject. If so the item is removed from the player's current location's list of items and is added to the player's inventory. A confirmation message or a failure message is then passed back to the user.

### `use` Command

The `use` command will run the `use` function of the item in the player's inventory that matches the command's subject.

### `calculate` Command

The `calculate` command will submit the answer of a user and reveal if it is correct or incorrect.

## Cartridges

Cartridges are loaded into the Console and are then playable by the user. The Console does most of the heavy lifting while the Cartridge adds all the flavor. 
