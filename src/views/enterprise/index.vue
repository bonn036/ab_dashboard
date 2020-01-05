<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="统一社会信用码" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.uscc }}
        </template>
      </el-table-column>
      <el-table-column label="企业 \ 机构名称" width="240" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="所在区域" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.area }}</span>
        </template>
      </el-table-column>
      <el-table-column label="法人身份证" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.art_cid }}
        </template>
      </el-table-column>
      <el-table-column prop="found_date" label="成立日期" width="260" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.found_date }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/enterprise'

export default {
  data() {
    return {
      list: null,
      loading: true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getList().then(response => {
        this.loading = false
        const { status, data } = response.data
        this.list = data
      })
    }
  }
}
</script>
