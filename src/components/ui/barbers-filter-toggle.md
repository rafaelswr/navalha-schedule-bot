
# Barbers Filter Toggle Component

Um componente de alternância que permite filtrar dados entre "Todos os barbeiros" e "Somente eu" na dashboard da barbearia.

## Recursos

- Design responsivo que funciona bem em dispositivos móveis e desktop
- Destaque visual para a opção selecionada
- Tooltips informativos ao passar o mouse
- Propriedades ARIA para acessibilidade
- Persistência da seleção entre páginas via localStorage
- Modo compacto para espaços reduzidos

## Uso

```tsx
import { BarbersFilterToggle } from "@/components/ui/barbers-filter-toggle";
import { useBarberFilter } from "@/hooks/use-barber-filter";

// Usando o hook para gerenciar o estado com persistência
const [barberFilter, setBarberFilter] = useBarberFilter("all", "dashboardBarberFilter");

// Exemplo de uso padrão
<BarbersFilterToggle
  value={barberFilter}
  onValueChange={setBarberFilter}
  currentBarberId="1"
/>

// Exemplo de uso em modo compacto (somente ícones)
<BarbersFilterToggle
  value={barberFilter}
  onValueChange={setBarberFilter}
  currentBarberId="1"
  compact={true}
/>
```

## Integrando na Dashboard

Para integrar o componente na dashboard:

1. Adicione o componente em um local visível (geralmente acima dos gráficos/tabelas)
2. Use o hook `useBarberFilter` para gerenciar o estado com persistência
3. Filtre os dados com base no valor selecionado:

```tsx
// Dados organizados por tipo de filtro
const dataByBarber = {
  "all": allBarbersData,
  "self": currentBarberData
};

// Uso do filtro para selecionar os dados corretos
const currentData = dataByBarber[barberFilter];
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|---------|-------------|
| `value` | `"all" \| "self"` | Obrigatório | Valor atual do filtro |
| `onValueChange` | `(value: "all" \| "self") => void` | Obrigatório | Função chamada quando o valor muda |
| `className` | `string` | `undefined` | Classes CSS adicionais |
| `currentBarberId` | `string \| number` | `undefined` | ID do barbeiro atual (para filtro) |
| `compact` | `boolean` | `false` | Modo compacto (somente ícones) |

## Hook `useBarberFilter`

O hook `useBarberFilter` gerencia o estado do filtro e o persiste no localStorage.

| Parâmetro | Tipo | Padrão | Descrição |
|------|------|---------|-------------|
| `defaultValue` | `"all" \| "self"` | `"all"` | Valor padrão do filtro |
| `storageKey` | `string` | `"barberFilter"` | Chave usada para armazenamento no localStorage |

Retorno: `[BarberFilterValue, (value: BarberFilterValue) => void]` - Estado atual do filtro e função setter

## Exemplo Completo

Veja o arquivo `AdminDashboard.tsx` para um exemplo completo de integração com dados filtrados.

