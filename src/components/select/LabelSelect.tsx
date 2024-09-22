import { ReactNode } from 'react';
import Dropdown, { Variation } from '../dropdown/Dropdown';

export type LabelSelectOptionsProps = {
  __type: string;
  name: string;
  icons?: ReactNode;
  fields: { id: string; name: string; value?: string | number }[];
};

type Props = {
  id: string;
  label?: string;
  controls: string;
  options: LabelSelectOptionsProps[];
  trigger?: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
  isOpen?: boolean;
  variation: Variation;
};

const LabelSelect = ({
  id,
  controls,
  options,
  trigger,
  label,
  type = 'combobox',
  required,
  onChange,
  isOpen,
  variation,
}: Props) => {
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
      variation={variation}
    >
      <Dropdown.Trigger />
      <Dropdown.Groups>
        <Dropdown.Header>게시글 주제를 선택해주세요</Dropdown.Header>
        {options.map((option, index) => {
          return (
            <Dropdown.Group key={index}>
              <Dropdown.Label>
                {option.icons}
                {option.name}
              </Dropdown.Label>
              <Dropdown.Menu>
                {option.fields.map((field) => {
                  return (
                    <Dropdown.Item
                      key={field.id}
                      value={field.name}
                      data-value={field.value ?? field.name}
                    >
                      {field.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown.Group>
          );
        })}
      </Dropdown.Groups>
    </Dropdown.Root>
  );
};
export default LabelSelect;
