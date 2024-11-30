# Variables
CXX := clang++
CXXFLAGS := -arch x86_64 -stdlib=libc++ -std=c++11 -I. -I./vendor -I/usr/include -I/System/Library/Frameworks/CoreFoundation.framework/Headers
OBJ_DIR := build/binary/darwin
BUILD_DIR := build
LIB_DIR := lib
SOURCE_DIR := source/binary
LIBRARY := $(LIB_DIR)/libdrivelist.dylib

# Source files
CPP_SOURCE := $(SOURCE_DIR)/drivelist.cpp
OBJ_CPP := $(BUILD_DIR)/drivelist.o
MM_SOURCE := $(SOURCE_DIR)/darwin/list.mm
OBJ_MM := $(OBJ_DIR)/list.o
M_SOURCE := $(SOURCE_DIR)/darwin/REDiskList.m
OBJ_M := $(OBJ_DIR)/REDiskList.o

# Frameworks
FRAMEWORKS := -framework Carbon -framework DiskArbitration -framework Foundation

# Targets
.PHONY: all clean

all: $(LIBRARY)

$(LIBRARY): $(OBJ_CPP) $(OBJ_MM) $(OBJ_M)
	mkdir -p $(LIB_DIR)
	$(CXX) -shared -arch x86_64 $(OBJ_CPP) $(OBJ_MM) $(OBJ_M) $(FRAMEWORKS) -o $@

$(OBJ_CPP): $(CPP_SOURCE)
	mkdir -p $(BUILD_DIR)
	$(CXX) -arch x86_64 -c -std=c++17 -o $@ -I./vendor $<

$(OBJ_MM): $(MM_SOURCE)
	mkdir -p $(OBJ_DIR)
	$(CXX) -x objective-c++ -c $< -o $@ $(CXXFLAGS)

$(OBJ_M): $(M_SOURCE)
	mkdir -p $(OBJ_DIR)
	$(CXX) -x objective-c++ -c $< -o $@ $(CXXFLAGS)

clean:
	rm -rf $(BUILD_DIR) $(LIB_DIR)
