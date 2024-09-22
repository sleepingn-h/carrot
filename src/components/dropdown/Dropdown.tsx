'use client';

import {
  createContext,
  ElementType,
  HtmlHTMLAttributes,
  memo,
  ReactNode,
  useContext,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.css';

export type Variation = 'chips' | 'default';
type Props = {
  as?: 'trigger';
  id: string;
  label: string;
  controls: string;
  type: string;
  variation?: Variation;
  trigger: string;
  children: React.ReactNode;
  required?: boolean;
  isOpen?: boolean;
  onChange: (value: string) => void;
};

type DropdownContextProps = {
  as: 'trigger';
  id: string;
  label: string;
  controls: string;
  type: string;
  variation: Variation;
  isDropdownOpen: boolean;
  selected: string | null;
  onChange: (value: string) => void;
  handleDropdown: () => void;
};

const DropdownContext = createContext<DropdownContextProps | null>(null);

export function useDropdown() {
  const context = useContext(DropdownContext);

  if (!context) throw new Error('Dropdown');
  return context;
}

const Root = ({
  as = 'trigger',
  id,
  controls,
  label,
  onChange,
  type,
  trigger,
  children,
  required,
  isOpen,
  variation = 'default',
}: Props) => {
  const [selected, setSelected] = useState(trigger || null);
  const [isDropdownOpen, setDropdown] = useState(isOpen);
  const handleChange = (value: string) => {
    setSelected(value);
    onChange(value);
  };
  const cnsLabel = classNames(styles.label, required ? styles.required : '');

  return (
    <DropdownContext.Provider
      value={{
        as,
        id,
        controls,
        label,
        isDropdownOpen,
        onChange: (value) => handleChange(value),
        handleDropdown: () => setDropdown(!isDropdownOpen),
        selected,
        type,
        variation,
      }}
    >
      <div className={classNames(styles[type], styles.dropdown)}>{children}</div>
    </DropdownContext.Provider>
  );
};

type HeaderProps = {
  as?: ElementType;
  children: ReactNode;
};

const Header = ({ as: Component = 'h2', ...props }: HeaderProps) => {
  return <Component className={styles.header} {...props} />;
};

const Trigger = ({ ...props }: HtmlHTMLAttributes<HTMLButtonElement>) => {
  const { as, id, label, controls, isDropdownOpen, handleDropdown, selected } = useDropdown();
  const cns = classNames(styles.trigger, selected ? styles.selected : '');
  const text = label ? label : '';

  if (as === 'trigger') {
    return (
      <button
        id={id}
        aria-controls={controls}
        ari-haspopup='menu'
        aria-expanded={isDropdownOpen}
        type='button'
        onClick={handleDropdown}
        className={cns}
        {...props}
      >
        {selected ?? `${text} 선택`}
      </button>
    );
  }
};

const Groups = ({ ...props }) => {
  const { isDropdownOpen } = useDropdown();
  return isDropdownOpen ? <div className={styles.groups} {...props} /> : null;
};

const Group = ({ ...props }) => {
  const { isDropdownOpen } = useDropdown();
  return isDropdownOpen ? <div className={styles.group} {...props} /> : null;
};

type MenuProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode[];
};

const Menu = ({ as: Component = 'ul', ...props }: MenuProps) => {
  const { variation, controls } = useDropdown();
  const cns = classNames(styles.menu, styles[props.className], styles[variation]);

  return <Component role='menu' aria-labelledby={controls} className={cns} {...props} />;
};

type LabelProps = {
  as?: ElementType;
  children: ReactNode;
};

const Label = ({ as: Component = 'h3', ...props }: LabelProps) => {
  return <Component role='heading' className={styles.label} {...props} />;
};

type ItemProps = {
  as?: ElementType;
  children: ReactNode;
  value: string;
};

const Item = ({ value, as: Component = 'li', ...props }: ItemProps) => {
  const { onChange, selected, handleDropdown } = useDropdown();
  const isSelected = selected === value;
  const cns = classNames(styles.item, isSelected ? styles.selected : '');

  const onSelect = () => {
    handleDropdown();
    onChange(value);
  };

  return (
    <Component
      role='option'
      className={cns}
      selected={isSelected ? true : false}
      onClick={onSelect}
      {...props}
    />
  );
};

const Dropdown = {
  Root: memo(Root),
  Header: memo(Header),
  Trigger: memo(Trigger),
  Groups: memo(Groups),
  Group: memo(Group),
  Menu: memo(Menu),
  Label: memo(Label),
  Item: memo(Item),
};

export default Dropdown;
