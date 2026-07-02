'use client';

import { clsx } from 'clsx';
import { ButtonComponent } from '../DefaultButton';
import { XIcon } from 'lucide-react';

type DialogProps = {
  type?: 'info' | 'action';
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  buttonLabel?: string;
  showXButton?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isDisable: boolean;
};

export function Dialog({
  type = 'info',
  isVisible = false,
  title,
  content,
  buttonLabel,
  showXButton = false,
  onConfirm,
  onCancel,
  isDisable = false,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (isDisable) return;

    onCancel();
  }

  const label = buttonLabel !== null ? buttonLabel : 'OK';

  return (
    <div
      className={clsx(
        'fixed z-50 inset-0 bg-black/50 backdrop-blur-xs',
        'flex items-center justify-center',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'bg-slate-100 p-6 rounded-lg max-w-2xl mx-6',
          'flex flex-col',
          'shadow-lg shadow-black/30 text-center',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        {showXButton && (
          <div className='flex flex-row justify-end'>
            <ButtonComponent
              styleType='custom'
              className={clsx(
                'insert-0 cursor-pointer',
                'text-slate-500',
                'hover:text-slate-700 transition',
              )}
              aria-label='Fechar dialog'
              onClick={onCancel}
            >
              <XIcon />
            </ButtonComponent>
          </div>
        )}
        <div className='flex flex-col gap-6'>
          <h3 id='dialogTitle' className={clsx('text-xl font-bold')}>
            {title}
          </h3>
          <div id='dialog-description'>{content}</div>
          <div className={clsx('flex items-center justify-around')}>
            {type === 'action' && (
              <ButtonComponent
                styleType='ghost'
                autoFocus
                onClick={handleCancel}
                disabled={isDisable}
              >
                Cancelar
              </ButtonComponent>
            )}
            <ButtonComponent
              styleType='danger'
              onClick={onConfirm}
              disabled={isDisable}
            >
              {`${type === 'info' ? 'Estou ciente' : label}`}
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
