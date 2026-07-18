import { useTranslation } from '@/context/language-context';
import { SectionTitle } from '@/components/common/section-title';

export function TermsOfServiceView() {
  const { t } = useTranslation();
  return (
    <div className="px-6 md:px-12 py-20 max-w-4xl mx-auto animate-fade-in">
      <SectionTitle subtitle={t('terms_of_service.last_updated')}>{t('terms_of_service.title')}</SectionTitle>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground/80 font-light space-y-4">
        <p>{t('terms_of_service.p1')}</p>
        
        <h3 className="font-bold text-foreground">{t('terms_of_service.h1')}</h3>
        <p>{t('terms_of_service.p2')}</p>

        <h3 className="font-bold text-foreground">{t('terms_of_service.h2')}</h3>
        <p>{t('terms_of_service.p3')}</p>
        <ul>
          <li>{t('terms_of_service.li1')}</li>
          <li>{t('terms_of_service.li2')}</li>
          <li>{t('terms_of_service.li3')}</li>
          <li>{t('terms_of_service.li4')}</li>
        </ul>

        <h3 className="font-bold text-foreground">{t('terms_of_service.h3')}</h3>
        <p>{t('terms_of_service.p4')}</p>
        <p>{t('terms_of_service.p5')}</p>

        <h3 className="font-bold text-foreground">{t('terms_of_service.h4')}</h3>
        <p>{t('terms_of_service.p6')}</p>
        
        <h3 className="font-bold text-foreground">{t('terms_of_service.h5')}</h3>
        <p dangerouslySetInnerHTML={{__html: t('terms_of_service.p7')}}></p>

        <h3 className="font-bold text-foreground">{t('terms_of_service.h6')}</h3>
        <p>{t('terms_of_service.p8')}</p>
      </div>
    </div>
  );
}
