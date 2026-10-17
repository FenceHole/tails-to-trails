import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS, DEFAULT_SMS_BODY, TEL_HREF, smsHref } from '@/content/site';

type Variant = 'ink' | 'bridge' | 'paper';

export function CallButton({
  variant = 'ink',
  className = '',
  label,
  small = false,
  testId = 'button-call',
}: {
  variant?: Variant;
  className?: string;
  label?: string;
  small?: boolean;
  testId?: string;
}) {
  return (
    <a
      href={TEL_HREF}
      className={`btn btn-${variant} ${small ? 'btn-sm' : ''} ${className}`}
      data-testid={testId}
    >
      <Phone className="h-5 w-5" aria-hidden="true" />
      {label ?? (
        <span>
          Call <span className="whitespace-nowrap">{BUSINESS.phoneDisplay}</span>
        </span>
      )}
    </a>
  );
}

export function TextButton({
  variant = 'bridge',
  className = '',
  label = 'Text Jennifer',
  body = DEFAULT_SMS_BODY,
  small = false,
  testId = 'button-text',
}: {
  variant?: Variant;
  className?: string;
  label?: string;
  body?: string;
  small?: boolean;
  testId?: string;
}) {
  return (
    <a
      href={smsHref(body)}
      className={`btn btn-${variant} ${small ? 'btn-sm' : ''} ${className}`}
      data-testid={testId}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {label}
    </a>
  );
}
