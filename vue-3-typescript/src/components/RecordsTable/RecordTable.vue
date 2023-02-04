<template>
    <table id="tableComponent" class="table table-bordered">
        <thead>
            <tr>
                <!-- table headers -->
                <th  v-for="column in columns" :key='column' > 
                {{ $t(entity + "." + column ) }} <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
                </th>
                <!-- <th  v-for="column in joinedColumns" :key='column' > 
                {{ $t(entity + "." + column ) }} <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
                </th> -->
            </tr>
        </thead>
        <tbody class="data-row">
            <!-- data -->
            <tr v-for="item in fields" :key='item'>
                <td v-for="column in columns" :key='column'>
                    <router-link :to="'/' + entity + '/' + item['id']">{{item[column]}}</router-link>
                    <router-link 
                        v-if="item['individual'] && (entity == 'staffMembers' || entity == 'students')" 
                        :to="'/' + entity + '/' + item['id']">
                        {{item['individual'][column]}}
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class RecordTable extends Vue {
    @Prop() public columns: string[] | undefined; 
    @Prop() public fields: [] | undefined;
    @Prop() public joinedColumns: string[] | undefined; 
    @Prop() public joinedFields: [] | undefined;
    @Prop() public entity: string | undefined;

    public created() {
    }

}
</script>

<style scoped>

.data-row tr:hover {
    background-color: #ebebeb;

}

.data-row a {
  color: black;
}

.data-row a:hover {
  color: black;
  text-decoration: none;
}

</style>