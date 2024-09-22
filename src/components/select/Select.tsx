import Dropdown from '../dropdown/Dropdown';

export type SelectOptions = {
  id: string;
  name: string;
  value?: string | number;
};

type Props = {
  id: string;
  label?: string;
  controls: string;
  options: SelectOptions[] | string[];
  trigger?: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
  isOpen?: boolean;
};

const Select = ({
  id,
  controls,
  options,
  trigger,
  label,
  type = 'combobox',
  required,
  onChange,
  isOpen,
}: Props) => {
  const optionsType = typeof options[0] === 'object';

  return (
    <Dropdown.Root
      label={label}
      id={id}
      controls={controls}
      onChange={onChange}
      type={type}
      trigger={trigger!}
      required={required}
      isOpen={isOpen}
    >
      <Dropdown.Trigger />
      <Dropdown.Groups>
        <Dropdown.Menu>
          {options.map((option, index) => {
            if (typeof option === 'string') {
              return (
                <Dropdown.Item key={index} value={option}>
                  {option}
                </Dropdown.Item>
              );
            }
            return (
              <Dropdown.Item
                key={option.id}
                value={option.name}
                data-value={option.value ?? option.name}
              >
                {option.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown.Groups>
    </Dropdown.Root>
  );
};

export default Select;
