import { FunctionComponent } from 'react';
import { ColorValue, ImageSourcePropType, LayoutRectangle, StyleProp, TextInput, TextProps, TextStyle, View, ViewStyle } from 'react-native';
export interface BubbleLayout {
    [key: string]: LayoutRectangle;
}
export interface BubbleProps {
    text: string;
    removeBubble: (id: string) => void;
    focus: boolean;
    setInvisibleCount: (obj: BubbleLayout) => void;
    bubbleCount: number;
    bubbleStyles?: StyleProp<ViewStyle>;
}
export declare const Bubble: FunctionComponent<BubbleProps>;

export interface HighlighterProps extends TextProps {
  defaultStyles?: StyleProp<TextStyle>;
  highlighterStyles?: StyleProp<TextStyle>;
  pattern: string;
  text: string;
}
export declare const Highlighter: FunctionComponent<HighlighterProps>;

export interface MainProps {
  showIcon?: boolean;
  mainTitle?: string | JSX.Element;
  wrapperStyles: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  wrapperFocusBorderColor?: ColorValue;
  preSelectedValues: string[];
  inputPlaceholder?: string;
  placeholderTextColor?: ColorValue;
  bubbleLimit?: number;
  separator?: string;
  onChangeBubbles: (b: string[]) => void;
  onTextFocus?: (flag: boolean, textInput?: TextInput | null) => void;
  dropdownHeader?: string;
  highlighterStyles?: StyleProp<TextStyle>;
  suggestions?: string[];
  focusIcon?: NodeRequire;
  unFocusIcon?: NodeRequire;
  testID?: string;
  bubbleStyles?: StyleProp<TextStyle>;
}
export declare const TagComponent: FunctionComponent<MainProps>;

export interface TileItemProps extends TextProps {
  defaultStyles?: StyleProp<ViewStyle>;
  highlighterStyles?: StyleProp<TextStyle>;
  pattern: string;
  text: string;
  selectedValues: {
      [key: string]: string | undefined;
  };
}
export declare const TileItem: FunctionComponent<TileItemProps>;

export declare const separator: (s: string, m: string) => string[];
export declare const free: (s: string, m: string) => string;
export declare const unFocus: () => void;

export interface Column {
  columnId: number;
  id: number;
  selected: boolean;
  value: string | null;
}
export interface Row {
  rowId: number;
  id: number;
  rowType: string;
  questionSelectionType: string | null;
  refId: string;
  color: null | ColorValue;
  values: unknown[];
  required: boolean;
  tableColumns: Column[];
}

export const Widths = {
  firstColumn: `33.333333333333336%`,
  otherColumns: `33.333333333333336%`,
  mergedColumns: `66.66666666666666%`,
  fullColumn: `100%`
} as const;

export interface Data {
  rowType: string;
  cellData: Column;
  rowIndex: number;
  cellIndex: number;
  columnWidths: typeof Widths
}
export interface ReturnData { 
  width: string;
  placeholder: string;
  textAlignCenter: boolean;
  enableAnswerTrigger: boolean;
  needToCaptureColumnWidths: boolean;
}
export interface DynamicTableProps {
  tableData: Row[];
  columnWidthsTemplate: typeof Widths;
  columnCount: number;
  cellHook: {[key: string]: (data: Data, ref: React.RefObject<View>) => ReturnData};
  defaultColumnType: string;
  onPressRow: (id: number) => void;
  renderPopup: (topH: number, rId: number) => JSX.Element;
  showPopup: boolean;
  activeBorderColor: ColorValue;
  defaultBorderColor: ColorValue;
  borderWidth: number;
  focusColor: ColorValue;
  contentEditable: boolean;
  popUpHeight: number;
  values: Row[];
  onChangeCellValue: (s: string, rId: number, cId: number) => void;
  onCellFocusOut: (data?: Column, rId?: number, cId?: number) => void;
  onselectAnswer?: (rId: number, cId: number, data: Column, selected: boolean) => void;
  errorRows?: number[];
  selectIconUrl: ImageSourcePropType;
  outSideClickEvent: (e: MouseEvent) => void;
  setTableProperties: (data: {rowHeights: {value: number, cellIndex: number}[], columnWidths: typeof Widths}) => void;
  WidthToIgnoreFromScreen: number;
  scrollable: boolean;
}
export declare const DynamicTable: FunctionComponent<DynamicTableProps>;