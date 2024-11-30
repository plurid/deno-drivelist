mkdir -p build/binary/darwin


clang++ -arch x86_64 -c -std=c++17 \
    -o build/drivelist.o \
    -I./vendor \
    source/binary/drivelist.cpp

clang++ -arch x86_64 -stdlib=libc++ -std=c++11 \
  -x objective-c++ \
  -c source/binary/darwin/list.mm \
  -o build/binary/darwin/list.o \
  -I. \
  -I./vendor \
  -I/usr/include \
  -I/System/Library/Frameworks/CoreFoundation.framework/Headers

clang++ -arch x86_64 -stdlib=libc++ -std=c++11 \
  -x objective-c++ \
  -c source/binary/darwin/REDiskList.m \
  -o build/binary/darwin/REDiskList.o \
  -I. \
  -I./vendor \
  -I/usr/include \
  -I/System/Library/Frameworks/CoreFoundation.framework/Headers

clang++ -shared -arch x86_64 -stdlib=libc++ \
    ./build/drivelist.o \
    ./build/binary/darwin/list.o \
    ./build/binary/darwin/REDiskList.o \
    -framework Carbon \
    -framework DiskArbitration \
    -framework Foundation \
    -o lib/libdrivelist.dylib
