'use client';

import { clsx } from 'clsx';
import { ButtonComponent } from '../DefaultButton';

type DialogProps = {
  type?: 'info' | 'action';
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  isDisable: boolean;
};

export function Dialog({
  type = 'info',
  isVisible = false,
  title,
  content,
  onConfirm,
  onCancel,
  isDisable = false,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (isDisable) return;

    onCancel();
  }

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
          'flex flex-col gap-6',
          'shadow-lg shadow-black/30 text-center',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialogTitle' className='text-xl font-bold'>
          {title}
        </h3>
        <div id='dialog-description'>{content}</div>
        <div className={clsx('flex items-center justify-around')}>
          {type === 'action' && (
            <ButtonComponent
              buttonType='cancel'
              text='CANCELAR'
              autoFocus
              onClick={handleCancel}
              disabled={isDisable}
            />
          )}
          <ButtonComponent
            buttonType='confirm'
            text={`${type === 'info' ? 'Estou ciente' : 'OK'}`}
            onClick={onConfirm}
            disabled={isDisable}
          />
        </div>
      </div>
    </div>
  );
}
