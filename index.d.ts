// Sandbox
interface Player {
  name: string;
  id: string;
}

interface Game {
  players: Array<Player>;
  currentPlayer: Player.id;
  currentTurn: number;
  box: Box;
}

// Game Defintion
interface Box {
  name: string;
  componentGroups: Array<ComponentGroup>;
}

enum ComponentTypes {
  Card = "Cards",
  Dice = "Dice"
}

interface ComponentGroup {
  name: string;
  components: Array<Component>;
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
