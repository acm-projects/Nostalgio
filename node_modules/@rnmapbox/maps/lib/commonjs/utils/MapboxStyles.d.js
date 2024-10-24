"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* This file was generated from MapboxStyle.ts.ejs do not modify */
/* TODO */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var VisibilityEnum = /*#__PURE__*/function (VisibilityEnum) {
  VisibilityEnum["Visible"] = "visible";
  VisibilityEnum["None"] = "none";
  return VisibilityEnum;
}(VisibilityEnum || {});
var FillTranslateAnchorEnum = /*#__PURE__*/function (FillTranslateAnchorEnum) {
  FillTranslateAnchorEnum["Map"] = "map";
  FillTranslateAnchorEnum["Viewport"] = "viewport";
  return FillTranslateAnchorEnum;
}(FillTranslateAnchorEnum || {});
var LineCapEnum = /*#__PURE__*/function (LineCapEnum) {
  LineCapEnum["Butt"] = "butt";
  LineCapEnum["Round"] = "round";
  LineCapEnum["Square"] = "square";
  return LineCapEnum;
}(LineCapEnum || {});
var LineJoinEnum = /*#__PURE__*/function (LineJoinEnum) {
  LineJoinEnum["Bevel"] = "bevel";
  LineJoinEnum["Round"] = "round";
  LineJoinEnum["Miter"] = "miter";
  return LineJoinEnum;
}(LineJoinEnum || {});
var LineTranslateAnchorEnum = /*#__PURE__*/function (LineTranslateAnchorEnum) {
  LineTranslateAnchorEnum["Map"] = "map";
  LineTranslateAnchorEnum["Viewport"] = "viewport";
  return LineTranslateAnchorEnum;
}(LineTranslateAnchorEnum || {});
var SymbolPlacementEnum = /*#__PURE__*/function (SymbolPlacementEnum) {
  SymbolPlacementEnum["Point"] = "point";
  SymbolPlacementEnum["Line"] = "line";
  SymbolPlacementEnum["LineCenter"] = "line-center";
  return SymbolPlacementEnum;
}(SymbolPlacementEnum || {});
var SymbolZOrderEnum = /*#__PURE__*/function (SymbolZOrderEnum) {
  SymbolZOrderEnum["Auto"] = "auto";
  SymbolZOrderEnum["ViewportY"] = "viewport-y";
  SymbolZOrderEnum["Source"] = "source";
  return SymbolZOrderEnum;
}(SymbolZOrderEnum || {});
var IconRotationAlignmentEnum = /*#__PURE__*/function (IconRotationAlignmentEnum) {
  IconRotationAlignmentEnum["Map"] = "map";
  IconRotationAlignmentEnum["Viewport"] = "viewport";
  IconRotationAlignmentEnum["Auto"] = "auto";
  return IconRotationAlignmentEnum;
}(IconRotationAlignmentEnum || {});
var IconTextFitEnum = /*#__PURE__*/function (IconTextFitEnum) {
  IconTextFitEnum["None"] = "none";
  IconTextFitEnum["Width"] = "width";
  IconTextFitEnum["Height"] = "height";
  IconTextFitEnum["Both"] = "both";
  return IconTextFitEnum;
}(IconTextFitEnum || {});
var IconAnchorEnum = /*#__PURE__*/function (IconAnchorEnum) {
  IconAnchorEnum["Center"] = "center";
  IconAnchorEnum["Left"] = "left";
  IconAnchorEnum["Right"] = "right";
  IconAnchorEnum["Top"] = "top";
  IconAnchorEnum["Bottom"] = "bottom";
  IconAnchorEnum["TopLeft"] = "top-left";
  IconAnchorEnum["TopRight"] = "top-right";
  IconAnchorEnum["BottomLeft"] = "bottom-left";
  IconAnchorEnum["BottomRight"] = "bottom-right";
  return IconAnchorEnum;
}(IconAnchorEnum || {});
var IconPitchAlignmentEnum = /*#__PURE__*/function (IconPitchAlignmentEnum) {
  IconPitchAlignmentEnum["Map"] = "map";
  IconPitchAlignmentEnum["Viewport"] = "viewport";
  IconPitchAlignmentEnum["Auto"] = "auto";
  return IconPitchAlignmentEnum;
}(IconPitchAlignmentEnum || {});
var TextPitchAlignmentEnum = /*#__PURE__*/function (TextPitchAlignmentEnum) {
  TextPitchAlignmentEnum["Map"] = "map";
  TextPitchAlignmentEnum["Viewport"] = "viewport";
  TextPitchAlignmentEnum["Auto"] = "auto";
  return TextPitchAlignmentEnum;
}(TextPitchAlignmentEnum || {});
var TextRotationAlignmentEnum = /*#__PURE__*/function (TextRotationAlignmentEnum) {
  TextRotationAlignmentEnum["Map"] = "map";
  TextRotationAlignmentEnum["Viewport"] = "viewport";
  TextRotationAlignmentEnum["Auto"] = "auto";
  return TextRotationAlignmentEnum;
}(TextRotationAlignmentEnum || {});
var TextJustifyEnum = /*#__PURE__*/function (TextJustifyEnum) {
  TextJustifyEnum["Auto"] = "auto";
  TextJustifyEnum["Left"] = "left";
  TextJustifyEnum["Center"] = "center";
  TextJustifyEnum["Right"] = "right";
  return TextJustifyEnum;
}(TextJustifyEnum || {});
var TextVariableAnchorEnum = /*#__PURE__*/function (TextVariableAnchorEnum) {
  TextVariableAnchorEnum["Center"] = "center";
  TextVariableAnchorEnum["Left"] = "left";
  TextVariableAnchorEnum["Right"] = "right";
  TextVariableAnchorEnum["Top"] = "top";
  TextVariableAnchorEnum["Bottom"] = "bottom";
  TextVariableAnchorEnum["TopLeft"] = "top-left";
  TextVariableAnchorEnum["TopRight"] = "top-right";
  TextVariableAnchorEnum["BottomLeft"] = "bottom-left";
  TextVariableAnchorEnum["BottomRight"] = "bottom-right";
  return TextVariableAnchorEnum;
}(TextVariableAnchorEnum || {});
var TextAnchorEnum = /*#__PURE__*/function (TextAnchorEnum) {
  TextAnchorEnum["Center"] = "center";
  TextAnchorEnum["Left"] = "left";
  TextAnchorEnum["Right"] = "right";
  TextAnchorEnum["Top"] = "top";
  TextAnchorEnum["Bottom"] = "bottom";
  TextAnchorEnum["TopLeft"] = "top-left";
  TextAnchorEnum["TopRight"] = "top-right";
  TextAnchorEnum["BottomLeft"] = "bottom-left";
  TextAnchorEnum["BottomRight"] = "bottom-right";
  return TextAnchorEnum;
}(TextAnchorEnum || {});
var TextWritingModeEnum = /*#__PURE__*/function (TextWritingModeEnum) {
  TextWritingModeEnum["Horizontal"] = "horizontal";
  TextWritingModeEnum["Vertical"] = "vertical";
  return TextWritingModeEnum;
}(TextWritingModeEnum || {});
var TextTransformEnum = /*#__PURE__*/function (TextTransformEnum) {
  TextTransformEnum["None"] = "none";
  TextTransformEnum["Uppercase"] = "uppercase";
  TextTransformEnum["Lowercase"] = "lowercase";
  return TextTransformEnum;
}(TextTransformEnum || {});
var IconTranslateAnchorEnum = /*#__PURE__*/function (IconTranslateAnchorEnum) {
  IconTranslateAnchorEnum["Map"] = "map";
  IconTranslateAnchorEnum["Viewport"] = "viewport";
  return IconTranslateAnchorEnum;
}(IconTranslateAnchorEnum || {});
var TextTranslateAnchorEnum = /*#__PURE__*/function (TextTranslateAnchorEnum) {
  TextTranslateAnchorEnum["Map"] = "map";
  TextTranslateAnchorEnum["Viewport"] = "viewport";
  return TextTranslateAnchorEnum;
}(TextTranslateAnchorEnum || {});
var CircleTranslateAnchorEnum = /*#__PURE__*/function (CircleTranslateAnchorEnum) {
  CircleTranslateAnchorEnum["Map"] = "map";
  CircleTranslateAnchorEnum["Viewport"] = "viewport";
  return CircleTranslateAnchorEnum;
}(CircleTranslateAnchorEnum || {});
var CirclePitchScaleEnum = /*#__PURE__*/function (CirclePitchScaleEnum) {
  CirclePitchScaleEnum["Map"] = "map";
  CirclePitchScaleEnum["Viewport"] = "viewport";
  return CirclePitchScaleEnum;
}(CirclePitchScaleEnum || {});
var CirclePitchAlignmentEnum = /*#__PURE__*/function (CirclePitchAlignmentEnum) {
  CirclePitchAlignmentEnum["Map"] = "map";
  CirclePitchAlignmentEnum["Viewport"] = "viewport";
  return CirclePitchAlignmentEnum;
}(CirclePitchAlignmentEnum || {});
var FillExtrusionTranslateAnchorEnum = /*#__PURE__*/function (FillExtrusionTranslateAnchorEnum) {
  FillExtrusionTranslateAnchorEnum["Map"] = "map";
  FillExtrusionTranslateAnchorEnum["Viewport"] = "viewport";
  return FillExtrusionTranslateAnchorEnum;
}(FillExtrusionTranslateAnchorEnum || {});
var RasterResamplingEnum = /*#__PURE__*/function (RasterResamplingEnum) {
  RasterResamplingEnum["Linear"] = "linear";
  RasterResamplingEnum["Nearest"] = "nearest";
  return RasterResamplingEnum;
}(RasterResamplingEnum || {});
var HillshadeIlluminationAnchorEnum = /*#__PURE__*/function (HillshadeIlluminationAnchorEnum) {
  HillshadeIlluminationAnchorEnum["Map"] = "map";
  HillshadeIlluminationAnchorEnum["Viewport"] = "viewport";
  return HillshadeIlluminationAnchorEnum;
}(HillshadeIlluminationAnchorEnum || {});
var ModelTypeEnum = /*#__PURE__*/function (ModelTypeEnum) {
  ModelTypeEnum["Common3d"] = "common-3d";
  ModelTypeEnum["LocationIndicator"] = "location-indicator";
  return ModelTypeEnum;
}(ModelTypeEnum || {});
var SkyTypeEnum = /*#__PURE__*/function (SkyTypeEnum) {
  SkyTypeEnum["Gradient"] = "gradient";
  SkyTypeEnum["Atmosphere"] = "atmosphere";
  return SkyTypeEnum;
}(SkyTypeEnum || {});
var AnchorEnum = /*#__PURE__*/function (AnchorEnum) {
  AnchorEnum["Map"] = "map";
  AnchorEnum["Viewport"] = "viewport";
  return AnchorEnum;
}(AnchorEnum || {});
//# sourceMappingURL=MapboxStyles.d.js.map