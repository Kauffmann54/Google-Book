import React from 'react'
import Select from 'react-select'

export class ComboBoxValueProps {
    value: string;
    label: string;

    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
}

interface ComboBoxProps {
    options: ComboBoxValueProps[],
    onChange: (value: ComboBoxValueProps) => void,
    value?: string,
    placeholder?: string,
    isDisabled?: boolean,
    isLoading?: boolean,
    isSearchable?: boolean,
}

export default function ComboBox(props: ComboBoxProps) {
    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            height: '60px',
            borderRadius: '8px',
            boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
            border: 'none',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            family: 'Montserrat',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '20px',
            letterSpacing: '0em',
            textAlign: 'left',
            color: '#666666',
        }),
        menu: (provided: any) => ({
            ...provided,
            borderRadius: '8px',
            boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.1)',
            border: 'none',
        }),
        indicatorSeparator: (provided: any) => ({
            ...provided,
            display: 'none',
        }),
        indicatorsContainer: (provided: any) => ({
            ...provided,
            marginRight: '17px',
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            color: '#666666',
            fontSize: '106px',
        }),
      }

    return (
        <div>
            <Select 
            styles={customStyles}
            placeholder={props.placeholder ? props.placeholder : "Selecionar"}
            noOptionsMessage={() => "Nenhum resultado encontrado"}
            isLoading={props.isLoading}
            isDisabled={props.isDisabled}
            onChange={(e) => props.onChange(e as ComboBoxValueProps)}
            options={props.options} 
            isSearchable={(props.isSearchable === undefined || props.isSearchable) ? true : false}
            value={props.value ? props.options.find(option => option.value === props.value) : null}
            />
        </div>
    )
}
