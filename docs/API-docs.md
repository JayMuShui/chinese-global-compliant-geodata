## API 文档

以下是本包提供的主要函数及其详细说明。

### getWorldGeoJSON(iso3Code?: string)

**功能**：获取全球地理数据，可选择按国家过滤。

#### 参数

-   `iso3Code` (string): **可选**。输入国家的 [ISO 三位代码](https://www.iso.org/iso-3166-country-codes.html)（例如：`'CHN'` 代表中国）。
    -   如果提供此参数，函数将返回 `world.json` 中匹配该 ISO 代码的单个国家地理特征。
    -   如果省略此参数，函数将返回全球所有国家的地理特征。

支持的国家列表及其数据详情，请参考 [世界地理数据说明](../src/geojson/globe/README.md) 文档。

#### 返回值

- GeoJSON `FeatureCollection` 对象，包含地理数据；如果数据加载失败或未找到，则返回 `null`。

### getCountyOrRegionGeoJSON(iso3Code: string, level: number, filterKey?: string, filterValue?: string)

**功能**：根据国家 ISO 三位代码和行政层级获取 GeoJSON 数据，并支持按属性过滤。

#### 参数

-   `iso3Code` (string): **必填**。输入国家的 [ISO 三位代码](https://www.iso.org/iso-3166-country-codes.html) (例如: `'CHN'`, `'JPN'`, `'KOR'`)，不区分大小写。
-   `level` (number): **必填**。所需数据的行政层级。
    -   通常 `0` 代表国家整体轮廓。
    -   `1` 通常代表省级或一级行政区划。
    -   `2` 或 `3` 代表市级、县级或其他次级行政区划。
    -   具体层级划分请参考各国家数据说明文档。
-   `filterKey?` (string): **可选**。用于过滤 GeoJSON 特征属性的键名。例如，你可以使用 `'name'` 来匹配中文名称，或使用 `'full_name'` 来匹配完整中文名称，还可以使用 `'gb'` 来匹配国家标准行政区划代码。
-   `filterValue?` (string): **可选**。与 `filterKey` 对应的属性值，用于精确匹配。例如，如果 `filterKey` 是 `'name'`，`filterValue` 可以是 `'北京'`；如果 `filterKey` 是 `'full_name'`，`filterValue` 可以是 `'北京市'`；如果 `filterKey` 是 `'gb'`，`filterValue` 可以是 `'156110000'`。

目前支持的国家：
- [中国](../src/geojson/countries/as/chn/global/README.md)
- [日本](../src/geojson/countries/as/jpn/global/README.md)
- [韩国](../src/geojson/countries/as/kor/global/README.md)
- [英国](../src/geojson/countries/eu/gbr/global/README.md)

#### 返回值

- GeoJSON `FeatureCollection` 对象，包含过滤后的地理数据；如果未找到对应数据、路径不正确或加载失败，则返回 `null` 并在控制台输出错误或警告信息。

### getRegionGeoJSON(iso3Code: string, regionCode: string, level?: number, filterKey?: string, filterValue?: string)

**功能**：获取指定国家（如中国）下特定区域（如台湾省）的 GeoJSON 数据，并支持按属性过滤。

#### 参数

-   `iso3Code` (string): **必填**。输入国家的 [ISO 三位代码](https://www.iso.org/iso-3166-country-codes.html)（例如：`'CHN'` 代表中国），不区分大小写。
-   `regionCode` (string): **必填**。二级行政单位的两位字母代码，用于指定特定区域。例如，`'TW'` (台湾省), `'HK'` (香港特别行政区), `'MO'` (澳门特别行政区)。不区分大小写。
-   `level` (number): **可选**，默认值为 `2`。所需数据的行政层级（例如：`1`, `2`, `3`），具体层级取决于数据来源。
-   `filterKey?` (string): **可选**。用于过滤 GeoJSON 特征属性的键名。例如，你可以使用 `'name'` 来匹配中文名称，或使用 `'full_name'` 来匹配完整中文名称，还可以使用 `'gb'` 来匹配国家标准行政区划代码。
-   `filterValue?` (string): **可选**。与 `filterKey` 对应的属性值，用于精确匹配。例如，如果 `filterKey` 是 `'name'`，`filterValue` 可以是 `'台北'`；如果 `filterKey` 是 `'full_name'`，`filterValue` 可以是 `'台北市'`；如果 `filterKey` 是 `'gb'`，`filterValue` 可以是 `'710100'`。

目前仅支持 [中国台湾省](../src/geojson/countries/as/chn/region/tw/README.md#数据说明)。

#### 返回值

- GeoJSON `FeatureCollection` 对象，包含过滤后的地理数据；如果未找到对应数据、路径不正确或加载失败，则返回 `null` 并在控制台输出错误或警告信息。

>因为函数是获取包含了存储在目录的静态Geojson文件，并通过Node.js的path方法，所以这个函数暂时不支持直接用于静态的前端页面进行构建，因此不能通过云端直接链接index.js的方法使用函数
>要在前端使用这些功能，需要将这些数据以 API 的形式提供，前端通过网络请求来获取这些数据。
>例如，可以使用 Express 等 Node.js 框架搭建一个服务器，将获取 GeoJSON 数据的逻辑封装成 API 接口，前端通过 fetch 等方法调用这些接口来获取数据。