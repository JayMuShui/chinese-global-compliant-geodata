# chinese-global-compliant-geodata

一个提供全面且符合中国视角的全球中文地理数据的 npm 包。

## 碎碎念

本项目源于我在开发 Myucloud Odyssey时遇到的一个挑战：难以找到符合国内法规且提供高质量中文地理数据的地图数据源。
为了解决这一痛点，于是我暂停 Myucloud Odyssey 的开发，转而投入到先收集、整理和编译符合规范的地理数据中。

因此，`chinese-global-compliant-geodata` 包的内容将伴随 Myucloud Odyssey 项目的需求而不断扩充。非常欢迎补充缺失的数据，共同完善这个项目！

## 特点

- 提供全面且符合中华人民共和国视角的全球中文地理数据。
- 数据严格遵循中国国家地理信息标准。
- 广泛兼容主流地图可视化框架（如 ECharts、Mapbox、Leaflet 等）。
- 数据优化高效，体积小巧，加载迅速，**通过 `simplify-js` 库对 GeoJSON 数据进行简化处理。**
- 支持 TypeScript、原生 JavaScript 和 Node.js 开发环境。

## 安装

通过以下命令轻松安装本包：

```bash
npm install chinese-global-compliant-geodata
# 或者
pnpm add chinese-global-compliant-geodata
```


## 使用方法


### 直接引用Geojson文件

-所有的Geojson文件都理应位于`node_modules/chinese-global-compliant-geodata/src/geojson`下，直接按需进行导入使用即可

-**通过 CDN**：
    ```
     // 使用 Fetch API 加载 JSON 数据
        const response = await fetch('https://unpkg.com/chinese-global-compliant-geodata@1.0.0/dist/src/geojson/countries/as/jpn/global/jpn-level-2.json');
    ```
    ❗注意由于Geojson大小的缘故影响性能

目前支持的国家数据列表

- [中国](src/geojson/countries/as/chn/global/README.md)
- [日本](src/geojson/countries/as/jpn/global/README.md)
- [韩国](src/geojson/countries/as/kor/global/README.md)
- [英国](src/geojson/countries/eu/gbr/global/README.md)



### 导入模块
本包提供了简洁的函数获取方法，方便你在不同开发环境中使用。以下是导入模块和使用核心功能的示例。

>因为函数是获取包含了存储在目录的静态Geojson文件，并通过Node.js的path方法，所以这个函数暂时不支持直接用于静态的前端页面进行构建，因此不能通过云端直接链接index.js的方法使用函数
>要在前端使用这些功能，需要将这些数据以 API 的形式提供，前端通过网络请求来获取这些数据。
>例如，可以使用 Express 等 Node.js 框架搭建一个服务器，将获取 GeoJSON 数据的逻辑封装成 API 接口，前端通过 fetch 等方法调用这些接口来获取数据。


-   **在 Node.js (CommonJS) 或原生 JavaScript 中**：
    ```javascript
    const { getWorldGeoJSON, getCountyOrRegionGeoJSON, getRegionGeoJSON } = require('chinese-global-compliant-geodata');
    ```

-   **在 TypeScript 或支持 ES Modules 的环境中**：
    ```typescript
    import { getWorldGeoJSON, getCountyOrRegionGeoJSON, getRegionGeoJSON } from 'chinese-global-compliant-geodata';
    ```

### 示例

以下是本包核心功能的典型使用示例。更详细的函数参数和返回值说明，请参考[API 文档](docs/API-docs.md)。

```javascript
// 示例 1: 获取世界整体轮廓数据
const worldData = getWorldGeoJSON();
console.log('世界数据特征数量:', worldData ? worldData.features.length : '无数据');

// 示例 2: 获取中国（ISO3: CHN）的世界 GeoJSON 数据
const chinaWorldData = getWorldGeoJSON('CHN');
console.log('中国（CHN）的世界数据特征数量:', chinaWorldData ? chinaWorldData.features.length : '无数据');

// 示例 3: 获取中国（ISO3: CHN）的省级（level 1）数据，并通过GB国标码过滤北京市
const beijingProvinceData = getCountyOrRegionGeoJSON('CHN', 1, 'gb', '156110000');
console.log('北京市（省级）数据特征数量:', beijingProvinceData ? beijingProvinceData.features.length : '无数据');

// 示例 4: 获取日本（ISO3: JPN）的二级行政区（level 2）数据
const japanLevel2Data = getCountyOrRegionGeoJSON('JPN', 2);
console.log('日本二级行政区数据特征数量:', japanLevel2Data ? japanLevel2Data.features.length : '无数据');

// 示例 5: 获取中国台湾（ISO3: CHN, Region Code: TW）地区二级（level 2）数据，并通过名称过滤台北市
const taipeiRegionData = getRegionGeoJSON('CHN', 'TW', 2, 'name', '台北');
console.log('中国台湾（台北）地区数据特征数量:', taipeiRegionData ? taipeiRegionData.features.length : '无数据');
```


## 数据来源

本包目前使用的地理数据来源于以下渠道，经过标准化处理，确保数据的准确性和合法性。
点击对应链接可查看更详细的数据来源、更新时间、包含范围及特别说明：

- **全球地理数据**：[Surbowl](src/geojson/globe/README.md#数据来源)
- **中国地理数据**：[中国国家地理信息公共服务平台—天地图](src/geojson/countries/as/chn/global/README.md#数据来源)
    - **台湾省地理数据**：[GeoJSON.CN](src/geojson/countries/as/chn/region/tw/README.md#数据来源)
- **日本地理数据**：[SmartNews（スマートニュース）](src/geojson/countries/as/jpn/global/README.md#数据来源说明)
- **韩国地理数据**：[NeuroWhAI](src/geojson/countries/as/kor/global/README.md#数据来源说明)
- **英国地理数据**：[geoBoundaries 项目](src/geojson/countries/eu/gbr/global/README.md#数据来源说明)

所有数据均经过标准化处理，包括：
1. 统一使用 WGS84 坐标系统
2. 规范化中文译名，遵循相关国家标准
3. 按行政区划代码排序
4. 添加必要的属性字段（如中文名称、英文名称等）
5. 优化数据结构，确保数据的一致性和可用性

## 贡献指南

我们非常欢迎并感谢社区的贡献！如果你有任何改进建议、新的地理数据来源，或者发现任何问题，请随时通过以下方式参与：

-   **提交 Issue**：如果你发现 bug、有功能请求或需要澄清之处，请在项目的 [GitHub Issues](https://github.com/JayMuShui/chinese-global-compliant-geodata/issues) 页面提交。
-   **提交 Pull Request**：我们热忱欢迎高质量的代码贡献和数据更新。在提交 Pull Request 之前，请务必确保您的代码符合项目规范并通过所有测试。针对数据更新，我们有以下明确要求：
    -   **数据准确性**：必须包含准确的中文地名。
    -   **多语言支持（可选）**：在可能的情况下，请提供对应地区的原语言地名写法。
    -   **政治合规性**：数据内容必须完全符合中华人民共和国的立场和相关法律法规。
    不符合上述任何要求的数据提交将不予合并。

感谢你的贡献，这将帮助我们共同完善这个项目！

### 开发环境设置

为了参与项目开发或贡献符合规范的中文 GeoJSON 数据，请遵循以下步骤设置你的开发环境：

1.  **安装 pnpm (可选)**：
    如果你偏好使用 `pnpm`，可以全局安装它：
    ```bash
    npm install -g pnpm@8.15.4
    ```

2.  **克隆仓库**：
    ```bash
    git clone https://github.com/JayMuShui/chinese-global-compliant-geodata.git
    cd chinese-global-compliant-geodata
    ```

3.  **安装依赖**：
    ```bash
    npm install
    # 或者
    pnpm install
    ```

4.  **构建项目**：
    ```bash
    npm run build
    # 或者
    pnpm build
    ```

5. **压缩 GeoJSON 文件**：
   如果你想压缩 `src/geojson` 目录下所有的 `.json` 文件，移除它们的缩进和空格，可以运行以下命令：
   ```bash
   npm run minify-geojson
   # 或者
   pnpm minify-geojson
   ```

## 项目声明

本项目旨在提供全面且符合中华人民共和国视角的全球中文地理数据，并致力于服务面向中国国内市场的合规项目开发。我们严格遵守相关法律法规和地理信息标准。

**重要提示**：
-   我们坚决反对任何恶意提交、上传或合并不合规、不准确或具有争议性的内容。
-   使用者需自行承担因使用非官方渠道或修改数据所产生的全部风险和责任。
-   为确保您所获取数据的完整性和未被篡改，请前往项目的 [Releases 页面](https://github.com/JayMuShui/chinese-global-compliant-geodata/releases) 查看最新发布包的 MD5 或 SHA256 校验码。






