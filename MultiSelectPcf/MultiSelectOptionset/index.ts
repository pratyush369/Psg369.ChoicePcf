import * as ReactDOM from "react-dom";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

import { IMultiSelectCheckBoxProps, MultiSelectCheckBox } from "./MultiSelectControl";
import * as React from "react";

export class MultiSelectOptionset implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  /**
   * Empty constructor.
   */
  constructor() {}
  private contextObj: ComponentFramework.Context<IInputs>;
  private containerObj: HTMLDivElement;
  private selected: number[] | null;
  private outputChanged: () => void;
  protected onChange = (value: number[] | null) => {
    this.selected = value;
    this.outputChanged();
  };
  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
    this.contextObj = context;
    this.containerObj = container;
    this.outputChanged = notifyOutputChanged;
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.contextObj = context;
    ReactDOM.render(
      React.createElement(MultiSelectCheckBox, {
        choices: this.contextObj.parameters.MultiSelectColumn.attributes?.Options,
        selected: this.contextObj.parameters.MultiSelectColumn.raw,
        notifyChange: this.onChange,
        theme: this.contextObj.parameters.FluentUIv9Theme.raw,
        isMasked: !this.contextObj.parameters.MultiSelectColumn.security?.readable,
        isDisabled: this.contextObj.mode.isControlDisabled || !this.contextObj.parameters.MultiSelectColumn.security?.editable,
        shape: this.contextObj.parameters.CheckBoxShape.raw,
        size: this.contextObj.parameters.CheckBoxSize.raw,
      } as IMultiSelectCheckBoxProps),
      this.containerObj
    );
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return { MultiSelectColumn: this.selected === null ? undefined : this.selected };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.containerObj);
  }
}
