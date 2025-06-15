import path from 'path';
import { FeatureCollection } from 'geojson';

// ISO 3166-1 alpha-3 代码到区域的映射表（
const ISO_TO_REGION_MAP: { [key: string]: string } = {
  'CHN': 'as', 
  'JPN': 'as', 
  'KOR': 'as',
  'GBR': 'eu',
  // 如果有其他大洲的ISO代码，需要在这里添加映射
};

/**
 * 获取世界整体轮廓数据，或通过 ISO 三位代码获取特定国家的数据。
 * @param iso3Code - 可选。国家 ISO 三位代码（如 'CHN'）。如果提供，则返回该国家的 GeoJSON 特征；否则返回所有国家。
 * @returns {FeatureCollection | null} GeoJSON 格式的地理数据，如果加载或过滤失败则返回 null。
 */
export function getWorldGeoJSON(iso3Code?: string): FeatureCollection | null {
  try {
    const worldGeoJSON = require(path.join(__dirname, 'src', 'geojson', 'globe', 'world.json')) as FeatureCollection;

    if (iso3Code) {
      const normalizedIso3Code = iso3Code.toUpperCase();
      const filteredFeatures = worldGeoJSON.features.filter(
        (feature) => feature.properties && feature.properties.iso_a3 === normalizedIso3Code
      );
      return { ...worldGeoJSON, features: filteredFeatures };
    }

    return worldGeoJSON;
  } catch (error) {
    console.error('加载世界地理数据失败：', error);
    return null;
  }
}

/**
 * 通过ISO三位代码和层级获取对应国家或地区的GeoJSON数据
 * @param iso3Code - 国家的ISO三位代码 (例如: 'CHN', 'JPN')，不区分大小写
 * @param level - 数据层级 (例如: 1, 2, 3)
 * @param filterKey? - 可选。用于过滤GeoJSON特点的属性键名 (例如: 'name', 'gb')
 * @param filterValue? - 可选。用于过滤GeoJSON特点的属性值 (例如: '北京市', '156110000')
 * @returns {FeatureCollection | null} GeoJSON 格式的地理数据对象，如果未找到则返回 null
 */
export function getCountyOrRegionGeoJSON(
  iso3Code: string,
  level: number,
  filterKey?: string,
  filterValue?: string
): FeatureCollection | null {
  const normalizedIso3Code = iso3Code.toUpperCase();
  const region = ISO_TO_REGION_MAP[normalizedIso3Code];

  if (!region) {
    console.warn(`未找到 ISO 代码 ${iso3Code} 对应的区域信息。请检查 ISO_TO_REGION_MAP。`);
    return null;
  }

  const filePath = path.join(__dirname, 'src', 'geojson', 'countries', region, normalizedIso3Code.toLowerCase(), 'global', `${normalizedIso3Code.toLowerCase()}-level-${level}.json`);

  try {
    const countryData = require(filePath) as FeatureCollection;

    if (filterKey && filterValue) {
      const filteredFeatures = countryData.features.filter(
        (feature) => feature.properties && feature.properties[filterKey] == filterValue
      );
      // 注意：这里使用 == 允许匹配字符串和数字类型，如果需要严格匹配，请使用 ===
      return { ...countryData, features: filteredFeatures };
    }

    return countryData;
  } catch (error) {
    console.error(`加载地理数据失败，路径：${filePath}。错误信息：`, error);
    return null;
  }
}

/**
 * 获取指定国家二级行政单位的GeoJSON数据，并支持属性过滤
 * @param iso3Code - 国家ISO三位代码（如 CHN、JPN、KOR）
 * @param regionCode - 二级行政单位代码（如 TW）
 * @param level - 数据层级（如2）
 * @param filterKey - 可选，属性键名
 * @param filterValue - 可选，属性值
 * @returns {FeatureCollection | null} 过滤后的GeoJSON数据
 */
export function getRegionGeoJSON(
  iso3Code: string,
  regionCode: string,
  level: number = 2,
  filterKey?: string,
  filterValue?: string
): FeatureCollection | null {
  const filePath = path.join(
    __dirname,
    'src',
    'geojson',
    'countries',
    'as',
    iso3Code.toLowerCase(),
    'region',
    regionCode.toLowerCase(),
    `${iso3Code.toLowerCase()}-${regionCode.toLowerCase()}-level-${level}.json`
  );
  try {
    const data = require(filePath) as FeatureCollection;
    if (filterKey && filterValue) {
      const filteredFeatures = data.features.filter(
        (feature) => feature.properties && feature.properties[filterKey] == filterValue
      );
      return { ...data, features: filteredFeatures };
    }
    return data;
  } catch (error) {
    console.error(`加载地理数据失败，路径：${filePath}。错误信息：`, error);
    return null;
  }
}
