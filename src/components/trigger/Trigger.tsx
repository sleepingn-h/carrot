import React, { ForwardedRef, forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';
import styles from './Trigger.module.css';

type BaseProps = {
  size?: 'sm' | 'md' | 'lg';
  bgColor?: 'primary' | 'secondary' | 'gray' | 'gray-900' | 'default';
};
type ButtonProps = JSX.IntrinsicElements['button'] & {
  href?: undefined;
};

type AnchorProps = JSX.IntrinsicElements['a'] & {
  href: string;
} & LinkProps;

type PolymorphicProps = (BaseProps & ButtonProps) | (BaseProps & AnchorProps);
type PolymorphicButton = {
  (props: AnchorProps): JSX.Element;
  (props: ButtonProps): JSX.Element;
};

const isAnchor = (props: PolymorphicProps): props is AnchorProps => {
  return props.href != undefined;
};

export const Trigger = forwardRef<HTMLButtonElement | HTMLAnchorElement, PolymorphicProps>(
  function Trigger({ bgColor = 'primary', size = 'lg', ...props }, ref) {
    const propsClassName = props.className ? props.className : '';
    const cns = classNames(styles.trigger, styles[bgColor], styles[size], propsClassName);

    if (isAnchor(props)) {
      const { href, as, replace, scroll, shallow, passHref, prefetch, locale, ...rest } = props;
      const linkProps = { href, as, replace, scroll, shallow, passHref, prefetch, locale };

      if (props.target) {
        return <a target='_blank' {...rest} {...linkProps} className={cns} />;
      }

      return (
        <Link
          {...linkProps}
          {...rest}
          className={cns}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
        />
      );
    }
    return (
      <button
        {...props}
        className={cns}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        type={props.type ?? 'button'}
      />
    );
  }
); // as PolymorphicButton;

export default Trigger;
