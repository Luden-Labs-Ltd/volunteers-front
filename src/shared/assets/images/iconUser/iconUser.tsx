import {IconButton} from "@/shared/ui";
import {t} from "i18next";

export const IconUser = () => {
  return <IconButton
    className="w-8 h-8 rounded-lg drop-shadow-[2px_2px_0_#004573]"
    key="profile"
    variant="ghost"
    aria-label={t('common.profile')}
    icon={
      <img
        src={'./'}
      />
    }
    onClick={() => console.log('Клик!')}
  />
}