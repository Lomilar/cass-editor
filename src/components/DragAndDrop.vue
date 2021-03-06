<template>
    <div
        id="drag-and-drop"
        @dragenter.prevent="handleDragEnter($event)"
        @dragleave.prevent="handleDragLeave($event)"
        @click="openFileExplorer()"
        @dragover.prevent
        @drop.prevent="addFile"
        :class="{ 'is-dragged-over': isDraggedOver}">
        <input
            type="file"
            :disabled="!uploadDisabled"
            @change="fileChange"
            ref="file"
            style="display: none;">
        <div class="section">
            <div class="columns">
                <div class="column is-12">
                    <p class="is-size-6">
                        Files to Upload
                    </p>
                </div>
                <div class="column is-12">
                    <p class="is-size-7">
                        Drag and drop, or click to upload.
                    </p>
                </div>
                <div class="column is-12">
                    <ul>
                        <li
                            class="is-size-7"
                            v-for="file in files">
                            {{ file.name }} ({{ file.size | kb }} kb)
                            <button
                                @click="removeFile(file)"
                                title="Remove">
                                X
                            </button>
                        </li>
                    </ul>
                </div><div class="column is-12">
                    <button
                        class="button is-primary is-small"
                        :disabled="uploadDisabled"
                        @click="upload">
                        Process Files
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DragAndDrop',
    data() {
        return {
            files: [],
            isDraggedOver: false,
            counter: 0
        };
    },
    computed: {
        uploadDisabled() {
            return this.files.length === 0;
        }
    },
    watch: {
    },
    filters: {
        kb: function(val) {
            return Math.floor(val / 1024);
        }
    },
    methods: {
        handleDragEnter(e) {
            this.counter++;
            if (e.target.id) {
                if (e.target.id === 'drag-and-drop') {
                    this.isDraggedOver = true;
                }
            }
        },
        handleDragLeave(e) {
            this.counter--;
            if (e.target) {
                if (e.target.id === 'drag-and-drop') {
                    if (this.counter === 0) {
                        this.isDraggedOver = false;
                    }
                }
            }
        },
        openFileExplorer() {
            if (this.uploadDisabled) {
                this.$refs.file.click();
            }
        },
        fileChange(e) {
            this.files = e.target.files || e.dataTransfer.files;
        },
        addFile(e) {
            let droppedFiles = e.dataTransfer.files;
            if (!droppedFiles) return;
            ([...droppedFiles]).forEach(f => {
                this.files.push(f);
            });
            this.isDraggedOver = false;
        },
        removeFile(file) {
            this.files = this.files.filter(f => {
                return f !== file;
            });
        },
        upload() {
            this.$emit('dragAndDropEmitFiles', this.files);
        }
    }
};

</script>

<style lang="scss">
    @import './../variables.scss';

#drag-and-drop {
    min-height: 100%;
}
#drag-and-drop.is-dragged-over {
    background-color: rgba($cass-primary-up, .3);
    border-radius: 15px;
}
</style>
