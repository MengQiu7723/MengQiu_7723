<template>
    <div class="form-container">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item label="订单编号">
                <el-input v-model="formData.deviceId" placeholder="订单编号"></el-input>
            </el-form-item>

            <el-form-item label="价格">
                <el-select v-model="formData.locationId" placeholder="价格" :clearable="true">
                    <el-option label="全部" value=""></el-option>
                    <el-option :key="item.id" v-for="item in locations" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="付款">
                <el-select :clearable="true" v-model="formData.deviceTypeId" placeholder="类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                            :key="item.id"
                            v-for="item in deviceTypes"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="分组">
                <el-select v-model="formData.groupId" placeholder="分组" :clearable="true">
                    <el-option label="全部" value=""></el-option>
                    <el-option :key="item.id" v-for="item in groups" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="日期">
                <el-date-picker
                        v-model="date"
                        type="daterange"
                        align="right"
                        :clearable="true"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                </el-date-picker>
            </el-form-item>

            <el-form-item style="padding-left:30px">
                <el-button type="default" @click="resetForm1('formInline')">重置</el-button>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>