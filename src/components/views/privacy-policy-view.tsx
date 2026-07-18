import { useTranslation } from '@/context/language-context';
import { SectionTitle } from '@/components/common/section-title';

export function PrivacyPolicyView() {
  const { t } = useTranslation();
  
  return (
    <div className="px-6 md:px-12 py-20 max-w-4xl mx-auto animate-fade-in">
      <SectionTitle subtitle={t('privacy_policy.last_updated')}>{t('privacy_policy.title')}</SectionTitle>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground/80 font-light space-y-4">
        <p>{t('privacy_policy.p1')}</p>
        
        <h3 className="font-bold text-foreground">{t('privacy_policy.h1')}</h3>
        <p>{t('privacy_policy.p2')}</p>

        <h3 className="font-bold text-foreground">{t('privacy_policy.h2')}</h3>
        <p>{t('privacy_policy.p3')}</p>
        <ul>
          <li>{t('privacy_policy.li1')}</li>
          <li>{t('privacy_policy.li2')}</li>
          <li>{t('privacy_policy.li3')}</li>
          <li dangerouslySetInnerHTML={{ __html: t('privacy_policy.li4') }}></li>
          <li>{t('privacy_policy.li5')}</li>
          <li>{t('privacy_policy.li6')}</li>
        </ul>

        <h3 className="font-bold text-foreground">{t('privacy_policy.h3')}</h3>
        <p>{t('privacy_policy.p4')}</p>

        <h3 className="font-bold text-foreground">{t('privacy_policy.h4')}</h3>
        <p>{t('privacy_policy.p5')}</p>
        
        <h3 className="font-bold text-foreground">{t('privacy_policy.h5')}</h3>
        <p dangerouslySetInnerHTML={{ __html: t('privacy_policy.p6') }}></p>

        <h3 className="font-bold text-foreground">{t('privacy_policy.h6')}</h3>
        <p>{t('privacy_policy.p7')}</p>
      </div>
    </div>
  );
}
