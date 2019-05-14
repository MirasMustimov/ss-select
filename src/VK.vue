<template>
    <div class="flex items-center justify-center pt-16">
        <ss-select :options="people" :multiple="true" :hide-selected="true" search-by="name" track-by="name" style="width: 380px" class="relative">
            <div slot-scope="{ filteredOptions, selectedOptions, isOpen, pointerIndex, $get, $unselect, $open }">
                <ss-select-toggle class="flex justify-between text-gray-600 px-2 py-1 border rounded-sm leading-none">
                    <div class="flex-1">
                        <!-- Selected options -->
                        <section>
                            <div v-for="selectedPerson in selectedOptions"
                                 class="text-sm bg-blue-600 text-white rounded-sm inline-flex items-center justify-between py-px px-1 leading-normal mr-1 mb-1 mb-1">
                                <div class="mr-2">{{ selectedPerson.name }}</div>
                                <button type="button" @click="$unselect(selectedPerson)" class="flex items-center">
                                    <svg class="inline-block w-3 h-3 fill-current text-gray-300" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                                </button>
                            </div>
                            <button v-if="selectedOptions.length && !isOpen" @click.stop="$open" type="button" class="focus:outline-none text-sm inline-flex items-center bg-gray-300 rounded-sm px-2 py-px leading-normal">
                                <div class="mr-2 text-gray-600">Добавить</div>
                                <svg class="w-3 h-3 fill-current text-gray-500 mt-px" viewBox="0 0 491.86 491.86"><path d="M465.167 211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316 18.267-34.316 26.69v184.924H26.69C18.267 211.614 0 223.053 0 245.929s18.267 34.316 26.69 34.316h184.924v184.924c0 8.422 11.438 26.69 34.316 26.69s34.316-18.268 34.316-26.69V280.245H465.17c8.422 0 26.69-11.438 26.69-34.316s-18.27-34.315-26.693-34.315z"/></svg>
                            </button>
                        </section>
                        <ss-select-search-input v-show="! (selectedOptions.length && !isOpen)" placeholder="Введите имя друга" class="w-full outline-none select-none"></ss-select-search-input>
                    </div>
                    <svg class="flex-none inline-block cursor-pointer h-4 w-5 fill-current mt-1" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </ss-select-toggle>

                <div v-show="isOpen" class="absolute z-10 min-w-full border rounded-sm -mt-px">
                    <ss-select-option v-for="(person, index) in filteredOptions"
                                      :index="index"
                                      :value="person"
                                      class="flex items-center px-3 py-1 cursor-pointer"
                                      :class="[
                                        index == pointerIndex ? 'bg-gray-200' : '',
                                        index == filteredOptions.length - 1 ? '' : 'border-b'
                                      ]">
                        <img :src="person.avatar_url" class="rounded-full w-8 h-8 flex-none mr-3">
                        <div class="flex-1">
                            <div class="text-blue-700 text-sm font-semibold">{{ person.name }}</div>
                            <div class="text-gray-600 text-xs">{{ person.belongs_to }}</div>
                        </div>
                    </ss-select-option>
                </div>
            </div>
        </ss-select>
    </div>
</template>

<script>
    import { SsSelectComponents } from './components'

    export default {
        components: { ...SsSelectComponents },

        data() {
            return {
                people: [
                    {
                        name: 'Руслан Бейсембаев',
                        avatar_url: 'https://pp.userapi.com/c639717/v639717512/12543/slWBvvt5yUA.jpg?ava=1',
                        belongs_to: 'МУИТ (IITU)',
                    },

                    {
                        name: 'Канат Атымтаев',
                        avatar_url: 'https://pp.userapi.com/c628131/v628131952/2807e/BJCXe3YqgzI.jpg?ava=1',
                        belongs_to: 'МУИТ (IITU)',
                    },

                    {
                        name: 'Bigaisha Sagandykova',
                        avatar_url: 'https://pp.userapi.com/c604330/v604330849/15a10/66Z0NJDKryc.jpg?ava=1',
                        belongs_to: 'Lens Studio',
                    },
                ]
            }
        }
    }
</script>
