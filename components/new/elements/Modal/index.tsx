/** @jsxRuntime classic */
/** @jsx jsx */
import { styled } from 'baseui';
import { Delete } from 'baseui/icon';
import { Theme } from 'baseui/theme';
import * as React from 'react';
import { Button, jsx } from 'theme-ui';

const ModalWrapper = styled<{ $hidden?: boolean }, 'div', Theme>('div', ({ $theme, $hidden }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: $hidden ? 'transparent' : $theme.colors.backgroundOverlayDark,
  transitionDuration: $theme.animation.timing200,
  transitionProperty: 'background-color',
  transitionFunction: $theme.animation.easeInCurve,
  display: 'flex',
}));
const ModalContent = styled<{ $width: string; $maxWidth: string; $hidden?: boolean }, 'div', Theme>(
  'div',
  ({ $theme, $hidden, $width, $maxWidth }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: $theme.colors.backgroundPrimary,
    transitionDuration: $theme.animation.timing200,
    transitionProperty: 'transform,width,max-width',
    transitionFunction: $theme.animation.easeInCurve,
    transform: $hidden ? 'translate(-100%)' : 'translateX(0)',
    [$theme.mediaQuery.medium]: {
      width: $width,
      maxWidth: $maxWidth,
    },
  })
);
const ModalCloseAction = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexGrow: 0,
  flexShrink: 0,
  justifyContent: 'flex-end',
});
const Backdrop = styled('div', {
  flexShrink: 1,
  flexGrow: 1,
});

export interface SIZE {
  small: 'small';
  auto: 'auto';
  large: 'large';
  full: 'full';
  default: 'default';
}

const Modal = (props: {
  children: React.ReactNode;
  open: boolean;
  size?: SIZE[keyof SIZE];
  onClose: () => void;
  position?: 'absolute' | 'bottom';
}): JSX.Element => {
  const { children, open, onClose, size, position } = props;
  // Animation related property
  const [hidden, setHidden] = React.useState<boolean>(!open);
  const [rendered, setRendered] = React.useState<boolean>(open);

  React.useEffect(() => {
    if (open) {
      setRendered(true);
      const timer = setTimeout(() => {
        setHidden(false);
      }, 1);
      return () => clearTimeout(timer);
    }
    setHidden(true);
    const timer = setTimeout(() => {
      setRendered(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [open]);

  let width;
  let maxWidth;
  switch (size) {
    case 'small':
      width = '400px';
      maxWidth = '400px';
      break;
    case 'large':
      width = '90%';
      maxWidth = '90%';
      break;
    case 'full':
      width = '100%';
      maxWidth = '100%';
      break;
    default:
      width = 'auto';
      maxWidth = '90%';
      break;
  }

  if (rendered) {
    if (position === 'bottom') {
      // TODO: Display modal with height = 50%
    }

    return (
      <ModalWrapper $hidden={hidden}>
        <ModalContent $hidden={hidden} $width={width} $maxWidth={maxWidth}>
          <ModalCloseAction>
            <Button
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              variant="outline"
              onClick={() => onClose()}
            >
              <Delete size={32} />
            </Button>
          </ModalCloseAction>
          {children}
        </ModalContent>
        <Backdrop onClick={() => onClose()} />
      </ModalWrapper>
    );
  }
  return null;
};
export default Modal;
