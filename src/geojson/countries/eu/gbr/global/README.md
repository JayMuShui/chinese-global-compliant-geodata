# 英国行政区划地理数据

本目录包含英国一、二级行政单位的详细 GeoJSON 数据文件。

## 目录结构

```
globe/
├── gbr-level-0.json             # 国家级边界数据
├── gbr-level-1.json             # 构成国行政区边界数据
└── gbr-level-2.json             # 二级行政区边界数据

```

## 数据说明

- `gbr-level-0.json`: 英国国家级边界数据。
- `gbr-level-1.json`: 英国一级构成国行政区（英格兰、苏格兰、威尔士、北爱尔兰）边界数据。
- `gbr-level-2.json`: 英国二级行政区（如郡、区等）边界数据，

## Geojson 数据结构

```json
{
  "type": "Feature",
  "properties": {
    "name_en": "Hartlepool",  // 地区英文名
    "name_zh": "哈特尔浦"     // 地区中文名
  },
  "geometry": {
    "type": "Polygon",
    ""coordinates": [
      [
        [
          [经度, 纬度],
          [经度, 纬度]
        ]
      ]
    ]
  }
}
```

### 数据结构说明

1.  **二级行政区属性说明**：
    -   `name_en`: 行政区英文名
    -   `name_zh`: 行政区中文名

2.  **geometry 属性说明**：
    -   `type`: 几何类型，可以是 `Polygon` 或 `MultiPolygon`
    -   `coordinates`: 坐标数组，使用 WGS84 坐标系统
        -   经度范围：-7.64133°W - 1.75159°E
        -   纬度范围：50.10319°N - 60.15456°N

### 使用说明

1.  **坐标系统**：WGS84 (EPSG:4326)
2.  **文件组织**：按行政区划层级组织


### 数据来源说明

1.  **数据提供**：
    -   geoBoundaries 项目
    -   网址：https://www.geoboundaries.org/

2. **版本信息**：
   - 更新时间：
    - level 0 2023-01-19 07:31:14 UTC
    - level 1 2023-04-22 13:00:40 UTC
    - level 2 2023-03-23 21:57:10 UTC
3. **版权信息**
    - CC BY 4.0
    
4.  **引用修改**：
    -   上传者: JayMuShui
    -   修改者: JayMuShui
    -   项目仓库: https://github.com/JayMuShui/chinese-global-compliant-geodata/
    -   修改时间: 2024-06-14 13:37:02 UTC
    -   修改内容：
        - 1. 为行政区数据添加了中文名称（name_zh）。
        - 2. 移除其他原项目多余数据，保留原名键为`name_en`
        - 3. 从二级行政区数据中移除了ID键。