<template>
    <ss-select :options="options">
        <div slot-scope="{ filteredOptions }">
            <div v-for="option in filteredOptions">
                {{ option.name }}
            </div>
        </div>
    </ss-select>
</template>

<script>
    import SsSelect from '../../SsComponents/SsSelect'

    export default {
        components: { SsSelect },

        props: ['options']
    }
</script>
