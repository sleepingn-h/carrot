'use client';
import dynamic from 'next/dynamic';
import React, { CSSProperties, Suspense, SVGAttributes, lazy, ReactNode } from 'react';
import { IconContext } from 'react-icons';

//https://codesandbox.io/p/devbox/nextjs-dynamic-import-with-react-icons-zk1kz9?file=%2Fcomponents%2FDynamicIcon.tsx%3A45%2C7-46%2C25
//https://codesandbox.io/p/sandbox/dynamiciconload-react-icons-6imgv

interface IProps {
  icon: string;
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes<SVGElement>;
  fallback: JSX.Element | null;
}

const DynamicIcon = ({ ...props }) => {
  const [library, iconComponent] = props.icon.split('/');

  if (!library || !iconComponent) return <div>Could Not Find Icon</div>;

  const lib = library.toLowerCase();
  const path = `react-icons/${lib}`;
  // const Icon = dynamic(async () => {
  //   const modules = await import(path);
  //   return { default: modules[iconComponent] };
  // });

  const Icon = dynamic(() =>
    import('react-icons/sl').then((mod) => ({ default: mod['SlMagnifier'] }))
  );

  const value: IconContext = {
    color: props.color,
    size: props.size,
    className: props.className,
    style: props.style,
    attr: props.attr,
  };

  return (
    <Suspense fallback={props.fallback}>
      <IconContext.Provider value={value}>
        <Icon />
      </IconContext.Provider>
    </Suspense>
  );
};

export default DynamicIcon;
