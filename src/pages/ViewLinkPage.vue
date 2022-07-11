<template>
    <div>
        {{ item }}
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            linkId: this.$route.params.id,
            item: {
                id: 0,
                name: '',
                parent: 0,
                link: '',
                status: '',
                sub: 0,
                children: ''
            }
        }
    },
    methods: {
        async getItem() {
            try{
                const response = await axios('http://localhost/sibup/dashboard/server/getlinks.php', {
                    params: {
                        linkbyid: this.linkId
                    }
                });
                if(response.data.id) {
                    this.item = response.data;
                }
            }catch(e) {
                console.log(e)
            }
            
        }
    },
    mounted() {
        this.getItem();
    }
}
</script>

<style lang="scss" scoped>

</style>