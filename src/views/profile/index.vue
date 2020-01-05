<template>
  <div class="app-container">
    <el-table
      v-loading="pLoading"
      :data="profile"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="uid" width="95">
        <template slot-scope="scope">{{ scope.$uid }}</template>
      </el-table-column>
      <el-table-column label="名称" width="110" align="center">
        <template slot-scope="scope">{{ scope.username }}</template>
      </el-table-column>
      <el-table-column label="mobile" width="210" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="email" width="310" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="create_date" width="260">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getProfile } from "@/api/enterprise";
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters(["uid"])
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      profile: null,
      pLoading: true
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.pLoading = true;
      getProfile().then(response => {
        this.pLoading = false;
        const { status, profiles } = response.data;
        this.profile = profiles[0];
        const { uid, username, mobile, email, cid, create_date } = this.profile;
      });
    }
  }
};
</script>
