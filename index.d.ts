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
interface ComponentGroup {
  name: string;
  components: Array<Component|ComponentGroup>;
}

interface Component {
  name: string;
  count: number;
}

interface Die extends Component {
  sides: number;
  faces: Array<string|number|null>;
  quantity: number;
}

interface Property {
  name: string;
  value: string|number;
}

interface Card extends Component {
  description: string;
  quantity: number;
  properties: Array<Property>
}
