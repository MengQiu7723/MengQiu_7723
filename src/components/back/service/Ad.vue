 <template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>广告管理</el-breadcrumb-item>
      <el-breadcrumb-item>增加广告</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="banner">
      <el-carousel :height="bannerHeight + 'px'">
        <el-carousel-item v-for="(item, index) in img_list" :key="index">
          <img ref="bannerHeight" :src="item.path" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="form-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.name" placeholder="名称搜索"></el-input>
        </el-form-item>
        <el-form-item label="广告类型">
          <el-select v-model="formInline.type" value="" placeholder="广告类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="图片" value="IMAGE"></el-option>
            <el-option label="视频" value="VIDEO"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="padding-left: 30px">
          <el-button type="default" @click="resetForm1('ruleForm')"
            >重置</el-button
          >
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <div class="table">
        <el-row>
          <el-button type="text" @click="dialogFormVisible = true">
            添加广告
          </el-button>
          <div class="form">
            <el-form
              :model="ruleForm"
              ref="ruleForm"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-dialog title="添加" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item
                    label="名称"
                    prop="name"
                    :rules="[
                      { required: true, message: '不能为空', trigger: 'blur' },
                    ]"
                  >
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="广告类型" prop="type">
                    <el-select
                      v-model="ruleForm.type"
                      @change="selAdvertisingType"
                      placeholder="广告类型"
                    >
                      <el-option label="图片" value="IMAGE"></el-option>
                      <el-option label="视频" value="VIDEO"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    v-if="isTime"
                    label="间隔时间(秒)"
                    prop="interval"
                    :rules="[
                      { required: true, message: '不能为空', trigger: 'blur' },
                    ]"
                  >
                    <el-input
                      type="number"
                      v-model="ruleForm.interval"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="设备类型" prop="deviceTypeId">
                    <el-select
                      v-model="ruleForm.deviceTypeId"
                      placeholder="设备类型"
                      @change="selEquipmentType"
                    >
                      <el-option
                        v-for="item in equipmentType"
                        :label="item.name"
                        :value="item.id"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="广告位类型" prop="adSpaceTypeId">
                    <el-select
                      v-model="ruleForm.adSpaceTypeId"
                      placeholder="广告位类型"
                    >
                      <el-option
                        v-for="item in advertisingSpaceType"
                        :label="item.name"
                        :value="item.id"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="text-align: center">
                    <el-button type="primary" @click="submitForm('ruleForm')">{{
                      submitTitle
                    }}</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </el-form>
          </div>
        </el-row>
        <el-table :data="lists" style="width: 100%">
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="type" label="类型"> </el-table-column>
          <el-table-column prop="stateText" label="状态"> </el-table-column>
          <el-table-column prop="devices" label="设备台数"> </el-table-column>
          <el-table-column prop="right" label="操作"> </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>

        <div class="pictureComponents">
          <ul>
            <li>
              <a href="javascript:;" class="file">
                <svg-icon icon-class="plus1"></svg-icon>
                <p class="info">上传图片</p>
                <input
                  @change="uploadImg($event)"
                  type="file"
                  accept="image/jpg,image/jpeg,image/png"
                  name=""
              /></a>
            </li>
            <li v-for="(item, index) in lists" :key="index">
              <img src="item.url" alt="" />
              <div v-show="isShow" @click.stop.prevent="selOpi(index)">
                <el-checkbox
                  class="checked"
                  v-model="item.checked"
                ></el-checkbox>
              </div>
            </li>
          </ul>
        </div>

        <div class="videoComponents">
          <ul>
            <li>
              <a href="javascript:;" class="file">
                <svg-icon icon-class="plus1"></svg-icon>
                <p class="info">上传视频</p>
                <input
                  @change="uploadImg($event)"
                  type="file"
                  accept="video/*,audio/*"
                  name=""
              /></a>
            </li>
            <li
              v-for="(item, index) in lists"
              :key="index"
              @click="clickVideoUrl(item.url, item.name)"
            >
              <video :src="item.url"></video>
              <span class="befang">
                <svg-icon icon-class="bofang"></svg-icon>
              </span>
              <div v-show="isShow" @click.stop.prevent="selOpi(index)">
                <el-checkbox
                  class="checked"
                  v-model="item.checked"
                ></el-checkbox>
              </div>
            </li>
          </ul>

          <el-dialog
            :visible.sync="detialPlayVideo"
            :title="title"
            v-if="state"
            @close="close"
          >
            <player :video-url="videoUrl"></player>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detialPlayVideo: false,
      lists: [],
      videoUrl: '',
      isShow: false,
      params: {
        type: 'IMAGE',
        from: 0,
        size: 10,
      },

      submitTitle: '立即创建',
      dialogFormVisible: false,
      isTime: true,
      ruleForm: {
        name: '',
        type: 'IMAGE',
        interval: '',
        deviceTypeId: '',
        adSpaceTypeId: '',
        deviceIds: [],
        resources: [],
      },
      dialogTableVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
      //获取走马灯图片
      img_list: [
        { path: require('../../../assets/images/book1.png') },
        { path: require('../../../assets/images/sunrise.png') },
        { path: require('../../../assets/images/book2.png') },
        { path: require('../../../assets/images/book3.png') },
        { path: require('../../../assets/images/book4.png') },
        { path: require('../../../assets/images/book5.png') },
      ],
      dialogFormVisible: false,
      bannerHeight: 500,
      screenWidth: 0,
      formInline: {
        name: '',
        type: '',
      },
    }
  },
  components: {},
  methods: {
    clcikVideoUrl(src, name) {
      this.state = true
      this.detialPlayVideo = true
      this.videoUrl = src
      this.title = name
    },

    /**
     * 重置
     */

    resetForm() {
      this.formInline = {
        name: '',
        type: '',
      }
      this.$$emit('resetForm')
    },

    // 重置按钮
    resetForm1() {
      this.formInline = {
        name: '',
        type: '',
      }
      this.$emit('resetForm')
    },

    //查询按钮
    onSubmit() {
      this.$emit('submit', this.formInline)
    },

    setSize: function () {
      this.bannerHeight = (400 / 1920) * this.screenWidth
    },
    onSubmit() {
      this.$$emit('submit', this.formInline)
    },
  },
  mounted() {
    this.screenWidth = window.innerHeight
    this.setSize()
    window.onreset = () => {
      this.screenWidth = window.innerWidth
      this.setSize()
    }
  },
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

.pictureComponents {
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;

  ul {
    overflow: hidden;

    li {
      position: relative;
      list-style: none;
      float: left;
      width: 218px;
      height: 118px;
      margin: 8px;

      img {
        width: 100%;
        height: 100%;
      }

      > div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);

        .checked {
          width: 100%;
          height: 100%;
        }
      }

      .file {
        position: relative;
        top: 0;
        display: inline-block;
        border-radius: 4px;
        overflow: hidden;
        color: #1e88c7;
        text-decoration: none;
        text-indent: 0;
        width: 217px;
        height: 118px;
        text-align: center;
        line-height: 86px;
        font-size: 40px;

        svg {
          font-size: 40px;
          color: rgba(181, 181 181, 1);
        }
        .info {
          position: absolute;
          font-size: 20px;
          top: 62px;
          left: 66px;
          color: #ccc;
          line-height: normal;
        }

        input {
          position: absolute;
          font-size: 100px;
          right: 0;
          top: 0;
          opacity: 0;
          cursor: pointer;
        }
      }
    }
  }
}

.videoComponents {
  float: left;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;

  ul {
    overflow: hidden;

    li {
      position: relative;
      list-style: none;
      float: left;
      width: 218px;
      height: 118px;
      margin: 8px;
      cursor: pointer;

      video {
        width: 100%;
        height: 100%;
      }

      .befang {
        position: absolute;
        top: 50px;
        left: 95px;
        .svg-icon {
          font-size: 30px;
          color: #fff;
        }
      }

      > div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);

        .checked {
          width: 100%;
          height: 100%;
        }
      }

      .file {
        position: relative;
        top: 0;
        display: inline-block;
        border: 2px dotted #d9d9d9;
        border-radius: 4px;
        overflow: hidden;
        color: #1e88c7;
        text-decoration: none;
        text-indent: 0;
        width: 217px;
        height: 118px;
        text-align: center;
        line-height: 86px;
        font-size: 40px;

        svg {
          font-size: 40px;
          color: rgba(181, 181, 181, 1);
        }

        .info {
          position: absolute;
          font-size: 20px;
          top: 62px;
          left: 66px;
          color: #ccc;
          line-height: normal;
        }

        input {
          position: absolute;
          font-size: 100px;
          right: 0;
          top: 0;
          opacity: 0;
          cursor: pointer;
        }
      }
    }
  }
}

.form-container {
  padding: 30px;
  background: #fff;
}
img {
  width: 100%;
  height: inherit;
}
</style>