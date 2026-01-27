import {Icon} from "@/shared/ui";

type ContactActionsType = {
    phone: string | null | undefined;
}

export const ContactActions = ({ phone }: ContactActionsType) => {
    const cleanPhone = phone?.replace(/[^0-9+]/g, '');

    return (
        <div className="flex items-center justify-center gap-4 mt-2 mb-6">
            <a href={`https://wa.me/${cleanPhone}`} target="_blank" rel="noopener noreferrer" className="w-[52px] h-[52px] flex items-center justify-center rounded-xl border border-[#004573] bg-white shadow-[1px_1px_0_0_#004573,2px_2px_0_0_#004573]">
                <Icon iconId="icon-whatsapp" size={54} />
            </a>
            <a href={`sms:${cleanPhone}`} className="w-[52px] h-[52px] flex items-center justify-center rounded-xl border border-[#004573] bg-white shadow-[1px_1px_0_0_#004573,2px_2px_0_0_#004573]">
                <Icon iconId="icon-chat-bubble" size={32} />
            </a>
            <a href={`tel:${cleanPhone}`} className="w-[52px] h-[52px] flex items-center justify-center rounded-xl border border-[#004573] bg-white shadow-[1px_1px_0_0_#004573,2px_2px_0_0_#004573]">
                <Icon iconId="icon-phone" size={24} />
            </a>
        </div>
    );
};
