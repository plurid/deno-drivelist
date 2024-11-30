#ifndef SRC_DRIVELIST_HPP_
#define SRC_DRIVELIST_HPP_


#include <string>
#include <vector>
#include "nlohmann/json.hpp"

using json = nlohmann::json;



namespace Drivelist {

struct DeviceDescriptor {
    std::string enumerator;
    std::string busType;
    std::string busVersion;
    bool busVersionNull = false;
    std::string device;
    std::string devicePath;
    bool devicePathNull = false;
    std::string raw;
    std::string description;
    std::string error;
    std::string partitionTableType;
    uint64_t size = 0;
    uint32_t blockSize = 512;
    uint32_t logicalBlockSize = 512;
    std::vector<std::string> mountpoints;
    std::vector<std::string> mountpointLabels;
    bool isReadOnly = false;
    bool isSystem = false;
    bool isVirtual = false;
    bool isRemovable = false;
    bool isCard = false;
    bool isSCSI = false;
    bool isUSB = false;
    bool isUAS = false;
    bool isUASNull = false;

    // Default constructor
    DeviceDescriptor() = default;

    // Parameterized constructor
    DeviceDescriptor(const std::string& enumerator,
           const std::string& busType,
           const std::string& busVersion,
           bool busVersionNull,
           const std::string& device,
           const std::string& devicePath,
           bool devicePathNull,
           const std::string& raw,
           const std::string& description,
           const std::string& error,
           const std::string& partitionTableType,
           uint64_t size,
           uint32_t blockSize,
           uint32_t logicalBlockSize,
           const std::vector<std::string>& mountpoints,
           const std::vector<std::string>& mountpointLabels,
           bool isReadOnly,
           bool isSystem,
           bool isVirtual,
           bool isRemovable,
           bool isCard,
           bool isSCSI,
           bool isUSB,
           bool isUAS,
           bool isUASNull)
        : enumerator(enumerator),
          busType(busType),
          busVersion(busVersion),
          busVersionNull(busVersionNull),
          device(device),
          devicePath(devicePath),
          devicePathNull(devicePathNull),
          raw(raw),
          description(description),
          error(error),
          partitionTableType(partitionTableType),
          size(size),
          blockSize(blockSize),
          logicalBlockSize(logicalBlockSize),
          mountpoints(mountpoints),
          mountpointLabels(mountpointLabels),
          isReadOnly(isReadOnly),
          isSystem(isSystem),
          isVirtual(isVirtual),
          isRemovable(isRemovable),
          isCard(isCard),
          isSCSI(isSCSI),
          isUSB(isUSB),
          isUAS(isUAS),
          isUASNull(isUASNull) {}

    json toJson() const {
        return {
            {"enumerator", enumerator},
            {"busType", busType},
            {"busVersion", busVersion},
            {"busVersionNull", busVersionNull},
            {"device", device},
            {"devicePath", devicePath},
            {"devicePathNull", devicePathNull},
            {"raw", raw},
            {"description", description},
            {"error", error},
            {"partitionTableType", partitionTableType},
            {"size", size},
            {"blockSize", blockSize},
            {"logicalBlockSize", logicalBlockSize},
            {"mountpoints", mountpoints},
            {"mountpointLabels", mountpointLabels},
            {"isReadOnly", isReadOnly},
            {"isSystem", isSystem},
            {"isVirtual", isVirtual},
            {"isRemovable", isRemovable},
            {"isCard", isCard},
            {"isSCSI", isSCSI},
            {"isUSB", isUSB},
            {"isUAS", isUAS},
            {"isUASNull", isUASNull}
        };
    }
};

std::vector<DeviceDescriptor> ListStorageDevices();
}  // namespace Drivelist

#endif  // SRC_DRIVELIST_HPP_
