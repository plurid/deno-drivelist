#include <iostream>
#include "nlohmann/json.hpp"
#include "drivelist.hpp"

using json = nlohmann::json;
using namespace Drivelist;



extern "C" const char* drivelist() {
    std::vector<DeviceDescriptor> devices = ListStorageDevices();

    json j = json::array();
    for (const auto& device : devices) {
        j.push_back(device.toJson());
    }

    static std::string jsonStr = j.dump();
    return jsonStr.c_str();
}

extern "C" void free_drivelist(DeviceDescriptor* devices) {
    delete[] devices;
}
