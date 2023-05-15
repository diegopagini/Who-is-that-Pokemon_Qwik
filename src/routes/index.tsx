/** @format */
import { $, component$, useSignal } from '@builder.io/qwik';
import { DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
	const pokemonId = useSignal<number>(1); // For primitives: booleans, strings, numbers, etc... For objects or arrays `useStore()`
	const showBackImage = useSignal<boolean>(false);
	const isVisible = useSignal<boolean>(true);
	const nav = useNavigate();

	const changePokemonId = $((value: number) => {
		// Because this function is going to be called in a lazy load way it needs to be serialized with `$()`
		if (pokemonId.value + value <= 0) return;
		pokemonId.value += value;
	});

	const toggleImage = $(() => {
		showBackImage.value = !showBackImage.value;
	});

	const goToPokemon = $(() => {
		nav(`/pokemon/${pokemonId.value}`);
	});

	return (
		<>
			<span class='text-2xl'>Buscador simple</span>
			<span class='text-9xl'>{pokemonId}</span>
			{/** Qwik knows when is a singal and there is no need to `call it` like pokemonId() */}

			<div onClick$={() => goToPokemon()}>
				<PokemonImage
					id={pokemonId.value}
					backImage={showBackImage.value}
					isVisible={isVisible.value}
				/>
			</div>

			<div class='mr-2'>
				<button
					onClick$={() => changePokemonId(-1)}
					class='btn btn-primary mr-2'
				>
					Anterior
				</button>
				<button
					onClick$={() => changePokemonId(+1)}
					class='btn btn-primary mr-2'
				>
					Siguiente
				</button>

				<button
					onClick$={() => toggleImage()}
					class='btn btn-primary mr-2'
				>
					Voltear
				</button>

				<button
					onClick$={() => (isVisible.value = !isVisible.value)}
					class='btn btn-primary'
				>
					Revelar
				</button>
			</div>
		</>
	);
});

/**
 * Meta tags for each page.
 */
export const head: DocumentHead = {
	title: 'PokeQwik',
	meta: [
		{
			name: 'description',
			content: 'My first page made with Qwik',
		},
	],
};
