import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ButtonComponent } from '@/presentation/components/DefaultButton';
import clsx from 'clsx';
import { RefreshCcwIcon } from 'lucide-react';

export function MaxRetryButton() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <ButtonComponent
          styleType='ghost'
          className={clsx(
            'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200',
            ' bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition',
            ' hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60',
            'font-semibold',
          )}
          disabled={true}
        >
          <RefreshCcwIcon className='h-4 w-4' />
          Não é possível fazer o reenvio
        </ButtonComponent>
      </TooltipTrigger>
      <TooltipContent>
        <p>O número máximo de tentativas foi atingido</p>
      </TooltipContent>
    </Tooltip>
  );
}
