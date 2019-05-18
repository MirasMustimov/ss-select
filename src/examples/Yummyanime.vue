<template>
    <div class="flex items-center justify-center pt-16">
        <ss-select :options="genres" track-by="name" :multiple="true" search-by="name" :disable-selected="true" style="width: 267px" class="relative">
            <div slot-scope="{ filteredOptions, isOpen, selectedOptions, pointerIndex, $unselect, $disabled }">
                <ss-select-toggle class="flex flex-wrap border border-gray-500 px-2 py-px" :class="[ isOpen ? 'border-green-500' : '' ]">
                    <!-- <section> -->
                        <div v-for="selectedGenre in selectedOptions"
                             class="text-sm bg-blue-600 text-white rounded-sm inline-flex items-center justify-between py-px px-1 leading-normal mr-1 mb-1 mb-1">
                            <div class="mr-2">{{ selectedGenre.name }}</div>
                            <button type="button" @click="$unselect(selectedGenre)" class="flex items-center">
                                <svg class="inline-block w-3 h-3 fill-current text-gray-300" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                            </button>
                        </div>
                    <!-- </section> -->
                    <ss-select-search-input :placeholder="isOpen ? '' : 'По каким жанрам искать'" class="outline-none select-none"></ss-select-search-input>
                </ss-select-toggle>

                <div v-show="isOpen" class="absolute z-10 min-w-full border border-gray-400 shadow -mt-px">
                    <ss-select-option v-for="(genre, index) in filteredOptions"
                                      :index="index"
                                      :value="genre"
                                      :class="[
                                        pointerIndex == index ? 'bg-green-500 text-white' : 'bg-white text-black',
                                        $disabled(genre) ? 'bg-white text-gray-500' : ''
                                      ]"
                                      class="px-2 py-px cursor-pointer">
                        {{ genre.name }}
                    </ss-select-option>
                </div>
            </div>
        </ss-select>
    </div>
</template>

<script>
    import { SsSelectComponents } from '../components'

    export default {
        components: { ...SsSelectComponents },

        data() {
            return {
                genres: [
                    {
                        name: 'Альтернативная история',
                    },
                    {
                        name: 'Альтернативная реальность',
                    },
                    {
                        name: 'Ангелы',
                    },
                    {
                        name: 'Андроиды',
                    },
                    {
                        name: 'Антивойна',
                    },
                    {
                        name: 'Антиутопия',
                    },
                    {
                        name: 'Баскетбол',
                    },
                    {
                        name: 'Бисёнен',
                    },
                    {
                        name: 'Боевые искуства'
                    },
                ]
            }
        }
    }
</script>
