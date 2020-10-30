// Sandbox
interface Player {
  name: string;
  id: string;
}
interface Game {
  players: Array<Player>;
  currentPlayer: Player.id;
  currentTurn: number;
  box: Box | null;
  table: Table;
}
interface Table {
  items: Array<TableItem>;
}
interface TableItem extends Draggable {
  component: Component|ComponentGroup;
  componentType: ComponentTypes|null;
  componentId: string;
  value: string;
}
interface Draggable {
  position: DraggablePosition;
  id: string;
}
interface DraggablePosition {
  x: number;
  y: number;
  z: number;
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
  id: string;
  components: Array<Component>;
  type: ComponentTypes;
}

interface Property {
  name: string;
  value: string|Array<string>|number;
  id: string;
}

interface Component {
  name: string;
  description?: string|null;
  quantity: number;
  properties: Array<Property>;
  id: string;
}

// Firebase b/c we don't have it installed
module firebase {
  module firestore {
    interface DocumentData {
      id: string;
      data: () => any;
    }
  }
}