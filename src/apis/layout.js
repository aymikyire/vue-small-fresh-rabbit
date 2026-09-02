/**
 * layout 模块的 API 接口
 *
 * 该模块封装了与页面布局相关的后端接口请求，主要用于获取
 * 网站的全局布局数据，例如导航分类信息等。
 *
 * 所有请求均通过 httpInstance（axios 实例）发送，
 * httpInstance 中已统一配置了 baseURL、超时时间、拦截器等。
 */

// 导入封装好的 axios 实例，用于发送 HTTP 请求
import httpInstance from "@/utils/http";

/**
 * 获取首页头部导航分类列表
 *
 * 该接口用于获取网站顶部导航栏中展示的商品分类数据，
 * 通常在 Layout 布局组件挂载时调用，渲染一级和二级分类菜单。
 *
 * @returns {Promise} 返回一个 Promise，resolve 后得到分类列表数据
 *
 * 使用示例：
 *   const res = await getCategoryAPI();
 *   console.log(res.data); // 分类列表数组
 */
export function getCategoryAPI() {
  return httpInstance({
    method:"get",
    url: "home/category/head",
  });
}
