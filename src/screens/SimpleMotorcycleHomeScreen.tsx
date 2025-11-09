import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {
  searchMotorcycles,
  getAllImages,
  getImagesByBrand,
  getImagesByModel,
  getImagesByYear,
} from "../utils/search";
import { vietnamMotorcycleBrands } from "../data/motorcycleData";
import {
  SearchResult,
  MotorcycleImage,
  MotorcycleBrand,
  MotorcycleModel,
} from "../types";

export default function SimpleMotorcycleHomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [currentImages, setCurrentImages] = useState<MotorcycleImage[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<MotorcycleBrand | null>(
    null
  );
  const [selectedModel, setSelectedModel] = useState<MotorcycleModel | null>(
    null
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentImages(getAllImages());
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchMotorcycles(searchQuery);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchResultPress = (result: SearchResult) => {
    setSearchQuery("");
    setShowResults(false);

    if (result.type === "brand") {
      const brand = result.data as MotorcycleBrand;
      setCurrentImages(getImagesByBrand(brand.id));
    } else if (result.type === "model") {
      const model = result.data as MotorcycleModel;
      setCurrentImages(getImagesByModel(model.id));
    } else if (result.type === "year") {
      // Handle year search result
      setShowResults(false);
    }
  };

  const handleImagePress = (image: MotorcycleImage) => {
    navigation.navigate("ImageViewer" as never, { image } as never);
  };

  const handleBrandSelect = (brand: MotorcycleBrand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedYear(null);
    setCurrentImages(getImagesByBrand(brand.id));
  };

  const handleModelSelect = (model: MotorcycleModel) => {
    setSelectedModel(model);
    setSelectedYear(null);
    setCurrentImages(getImagesByModel(model.id));
  };

  const handleYearSelect = (year: number) => {
    if (selectedModel) {
      setSelectedYear(year);
      setCurrentImages(getImagesByYear(selectedModel.id, year));
    }
  };

  const clearFilters = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedYear(null);
    setCurrentImages(getAllImages());
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => handleSearchResultPress(item)}
    >
      <View style={styles.searchResultContent}>
        <Text style={styles.searchResultTitle}>{item.name}</Text>
        <Text style={styles.searchResultSubtitle}>{item.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  const renderImageItem = ({ item }: { item: MotorcycleImage }) => (
    <TouchableOpacity
      style={styles.imageCard}
      onPress={() => handleImagePress(item)}
    >
      <Image
        source={{ uri: item.url || "https://via.placeholder.com/200x150" }}
        style={styles.imagePreview}
        defaultSource={{ uri: "https://via.placeholder.com/200x150" }}
      />
      <Text style={styles.imageTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderSideMenu = () => (
    <Modal
      visible={sideMenuVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setSideMenuVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.sideMenu}>
          <View style={styles.sideMenuHeader}>
            <Text style={styles.sideMenuTitle}>Motorcycle Brands</Text>
            <TouchableOpacity onPress={() => setSideMenuVisible(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.sideMenuContent}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Show All</Text>
            </TouchableOpacity>

            {vietnamMotorcycleBrands.map((brand) => (
              <View key={brand.id} style={styles.brandSection}>
                <TouchableOpacity
                  style={[
                    styles.brandItem,
                    selectedBrand?.id === brand.id && styles.selectedBrandItem,
                  ]}
                  onPress={() => handleBrandSelect(brand)}
                >
                  <Text
                    style={[
                      styles.brandName,
                      selectedBrand?.id === brand.id &&
                        styles.selectedBrandText,
                    ]}
                  >
                    {brand.name}
                  </Text>
                  <Text style={styles.brandModelsCount}>
                    {brand.models.length} models
                  </Text>
                </TouchableOpacity>

                {selectedBrand?.id === brand.id && (
                  <View style={styles.modelsSection}>
                    {brand.models.map((model) => (
                      <View key={model.id}>
                        <TouchableOpacity
                          style={[
                            styles.modelItem,
                            selectedModel?.id === model.id &&
                              styles.selectedModelItem,
                          ]}
                          onPress={() => handleModelSelect(model)}
                        >
                          <Text
                            style={[
                              styles.modelName,
                              selectedModel?.id === model.id &&
                                styles.selectedModelText,
                            ]}
                          >
                            {model.name}
                          </Text>
                        </TouchableOpacity>

                        {selectedModel?.id === model.id && (
                          <View style={styles.yearsSection}>
                            {model.years.map((yearData) => (
                              <TouchableOpacity
                                key={yearData.year}
                                style={[
                                  styles.yearItem,
                                  selectedYear === yearData.year &&
                                    styles.selectedYearItem,
                                ]}
                                onPress={() => handleYearSelect(yearData.year)}
                              >
                                <Text
                                  style={[
                                    styles.yearText,
                                    selectedYear === yearData.year &&
                                      styles.selectedYearText,
                                  ]}
                                >
                                  {yearData.year} ({yearData.images.length}{" "}
                                  images)
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setSideMenuVisible(true)}
        >
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search motorcycles..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={() => setSearchQuery("")}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results */}
      {showResults && (
        <View style={styles.searchResults}>
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id}
            style={styles.searchResultsList}
          />
        </View>
      )}

      {/* Images Grid */}
      {!showResults && (
        <View style={styles.imagesSection}>
          <Text style={styles.sectionTitle}>
            {selectedYear
              ? `${selectedModel?.name} ${selectedYear}`
              : selectedModel
              ? selectedModel.name
              : selectedBrand
              ? selectedBrand.name
              : "All Motorcycles"}{" "}
            ({currentImages.length})
          </Text>
          <FlatList
            data={currentImages}
            renderItem={renderImageItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            style={styles.imagesList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {renderSideMenu()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuButton: {
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  clearSearchButton: {
    marginLeft: 8,
  },
  searchResults: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    maxHeight: 300,
  },
  searchResultsList: {
    maxHeight: 300,
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  searchResultSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  imagesSection: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  imagesList: {
    flex: 1,
  },
  row: {
    justifyContent: "space-between",
  },
  imageCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagePreview: {
    width: "100%",
    height: 120,
    backgroundColor: "#f0f0f0",
  },
  imageTitle: {
    padding: 8,
    fontSize: 12,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sideMenu: {
    width: "80%",
    height: "100%",
    backgroundColor: "white",
    paddingTop: 40,
  },
  sideMenuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sideMenuTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  sideMenuContent: {
    flex: 1,
  },
  clearButton: {
    backgroundColor: "#007AFF",
    margin: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  clearButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  brandSection: {
    marginBottom: 8,
  },
  brandItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  selectedBrandItem: {
    backgroundColor: "#e3f2fd",
  },
  brandName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  selectedBrandText: {
    color: "#1976d2",
  },
  brandModelsCount: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  modelsSection: {
    backgroundColor: "#f8f9fa",
    paddingLeft: 16,
  },
  modelItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  selectedModelItem: {
    backgroundColor: "#e8f5e8",
  },
  modelName: {
    fontSize: 14,
    color: "#333",
  },
  selectedModelText: {
    color: "#2e7d32",
    fontWeight: "500",
  },
  yearsSection: {
    backgroundColor: "#f0f0f0",
    paddingLeft: 16,
  },
  yearItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedYearItem: {
    backgroundColor: "#fff3e0",
  },
  yearText: {
    fontSize: 12,
    color: "#666",
  },
  selectedYearText: {
    color: "#f57c00",
    fontWeight: "500",
  },
});
