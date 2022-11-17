import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: any) => {
  return format(parseISO(date), "dd/MM/yyyy 'as' H:mm", { locale: ptBR });
};
