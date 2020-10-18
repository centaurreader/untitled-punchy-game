// Sandbox
interface Player {
  name: string;
  id: string;
}

interface Game {
  players: Array<Player>;
  currentPlayer: Player.id;
  currentTurn: number;
}

// Game Defintion
enum ComponentTypes {
  Box = "Box",
  Card = "Cards",
  Die = "Dice"
}

interface ComponentGroup {
  name: string;
  components: Array<Component|ComponentGroup>;
  type: ComponentTypes;
}

interface Property {
  name: string;
  value: string|number;
}

interface Component {
  name: string;
  description?: string|null;
  quantity: number;
  properties: Array<Property>;
}
