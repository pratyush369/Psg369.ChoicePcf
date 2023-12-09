import { Checkbox, CheckboxOnChangeData } from "@fluentui/react-components";
import { FluentProvider, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme, Theme, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import * as React from "react";

export interface IMultiSelectCheckBoxProps {
  choices: ComponentFramework.PropertyHelper.OptionMetadata[] | undefined;
  selected: number[] | null;
  notifyChange(selectedOptionsOut: number[] | null): void;
  theme: string;
  isDisabled: boolean;
  isMasked: boolean;
  shape: "square" | "circular" | undefined;
  size: "medium" | "large" | undefined;
}
const fluentThemes: Record<string, Theme> = {
  teamsLightTheme: teamsLightTheme,
  teamsDarkTheme: teamsDarkTheme,
  teamsHighContrastTheme: teamsHighContrastTheme,
  webLightTheme: webLightTheme,
  webDarkTheme: webDarkTheme,
};

export const MultiSelectCheckBox = React.memo(({ choices, selected, notifyChange, theme, isDisabled, isMasked, shape, size }: IMultiSelectCheckBoxProps) => {
  if (!choices || isMasked) return <>****</>;
  let selectedOptions = selected;
  const onOptionSelect = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
    if (data.checked) {
      if (!selectedOptions) {
        selectedOptions = [];
      }
      (selectedOptions as number[]).push(parseInt(ev.target.getAttribute("value")!));
    } else {
      if (!selectedOptions) {
        selectedOptions = [];
      }
      selectedOptions = (selectedOptions as number[]).filter((val) => {
        if (parseInt(ev.target.getAttribute("value")!) === val) return false;
        else return true;
      });
    }
    notifyChange(selectedOptions);
  }, []);
  const isCheckedChecker = (choiceVal: number): boolean => {
    if (selectedOptions && (selectedOptions as number[]).indexOf(choiceVal) !== -1) return true;
    else return false;
  };

  return (
    <>
      <FluentProvider theme={fluentThemes[theme]}>
        {choices!.map((choice, index) => {
          return (
            <React.Fragment key={String(choice.Value) + "_container_" + String(index)}>
              <Checkbox
                key={choice.Value}
                checked={isCheckedChecker(choice.Value)}
                label={choice.Label}
                value={choice.Value}
                onChange={(e, d) => onOptionSelect(e, d)}
                disabled={isDisabled}
                shape={shape}
                size={size}
              />{" "}
              <br />
            </React.Fragment>
          );
        })}
      </FluentProvider>
    </>
  );
});
