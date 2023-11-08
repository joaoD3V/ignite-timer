import { HandPalm, Play } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { FormProvider, useForm } from 'react-hook-form';
import { useCycles } from '../../contexts/CyclesContext';

const newCycleValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa.'),
  minutesAmount: z
    .number()
    .min(5, 'O ciclo precisa ser de no máximo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = z.infer<typeof newCycleValidationSchema>; // Sempre que for referenciar uma variável javascript dentro do typescript, necessário usar o typeof

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useCycles();

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset(); // Para usar, precisa ter o defaultValues previamente setado
  }

  const task = watch('task');
  const isSubmitDisabled = !task; // Variável auxiliar

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
