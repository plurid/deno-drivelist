clang++ -arch x86_64 -c -std=c++17 \
    -o build/drivelist.o \
    -I./vendor \
    source/binary/drivelist.cpp


clang++ -shared -arch x86_64 -stdlib=libc++ \
    ./build/drivelist.o \
    -framework Carbon \
    -framework DiskArbitration \
    -framework Foundation \
    -o lib/libdrivelist.dylib
