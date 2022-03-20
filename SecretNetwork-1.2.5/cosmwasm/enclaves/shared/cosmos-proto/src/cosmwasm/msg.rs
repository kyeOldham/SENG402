// This file is generated by rust-protobuf 2.25.2. Do not edit
// @generated

// https://github.com/rust-lang/rust-clippy/issues/702
#![allow(unknown_lints)]
#![allow(clippy::all)]

#![allow(unused_attributes)]
#![cfg_attr(rustfmt, rustfmt::skip)]

#![allow(box_pointers)]
#![allow(dead_code)]
#![allow(missing_docs)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(non_upper_case_globals)]
#![allow(trivial_casts)]
#![allow(unused_imports)]
#![allow(unused_results)]
//! Generated file from `secret/compute/v1beta1/msg.proto`

/// Generated files are compatible only with the same version
/// of protobuf runtime.
// const _PROTOBUF_VERSION_CHECK: () = ::protobuf::VERSION_2_25_2;

#[derive(PartialEq,Clone,Default)]
pub struct MsgStoreCode {
    // message fields
    pub sender: ::std::vec::Vec<u8>,
    pub wasm_byte_code: ::std::vec::Vec<u8>,
    pub source: ::std::string::String,
    pub builder: ::std::string::String,
    // special fields
    pub unknown_fields: ::protobuf::UnknownFields,
    pub cached_size: ::protobuf::CachedSize,
}

impl<'a> ::std::default::Default for &'a MsgStoreCode {
    fn default() -> &'a MsgStoreCode {
        <MsgStoreCode as ::protobuf::Message>::default_instance()
    }
}

impl MsgStoreCode {
    pub fn new() -> MsgStoreCode {
        ::std::default::Default::default()
    }

    // bytes sender = 1;


    pub fn get_sender(&self) -> &[u8] {
        &self.sender
    }
    pub fn clear_sender(&mut self) {
        self.sender.clear();
    }

    // Param is passed by value, moved
    pub fn set_sender(&mut self, v: ::std::vec::Vec<u8>) {
        self.sender = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_sender(&mut self) -> &mut ::std::vec::Vec<u8> {
        &mut self.sender
    }

    // Take field
    pub fn take_sender(&mut self) -> ::std::vec::Vec<u8> {
        ::std::mem::replace(&mut self.sender, ::std::vec::Vec::new())
    }

    // bytes wasm_byte_code = 2;


    pub fn get_wasm_byte_code(&self) -> &[u8] {
        &self.wasm_byte_code
    }
    pub fn clear_wasm_byte_code(&mut self) {
        self.wasm_byte_code.clear();
    }

    // Param is passed by value, moved
    pub fn set_wasm_byte_code(&mut self, v: ::std::vec::Vec<u8>) {
        self.wasm_byte_code = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_wasm_byte_code(&mut self) -> &mut ::std::vec::Vec<u8> {
        &mut self.wasm_byte_code
    }

    // Take field
    pub fn take_wasm_byte_code(&mut self) -> ::std::vec::Vec<u8> {
        ::std::mem::replace(&mut self.wasm_byte_code, ::std::vec::Vec::new())
    }

    // string source = 3;


    pub fn get_source(&self) -> &str {
        &self.source
    }
    pub fn clear_source(&mut self) {
        self.source.clear();
    }

    // Param is passed by value, moved
    pub fn set_source(&mut self, v: ::std::string::String) {
        self.source = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_source(&mut self) -> &mut ::std::string::String {
        &mut self.source
    }

    // Take field
    pub fn take_source(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.source, ::std::string::String::new())
    }

    // string builder = 4;


    pub fn get_builder(&self) -> &str {
        &self.builder
    }
    pub fn clear_builder(&mut self) {
        self.builder.clear();
    }

    // Param is passed by value, moved
    pub fn set_builder(&mut self, v: ::std::string::String) {
        self.builder = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_builder(&mut self) -> &mut ::std::string::String {
        &mut self.builder
    }

    // Take field
    pub fn take_builder(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.builder, ::std::string::String::new())
    }
}

impl ::protobuf::Message for MsgStoreCode {
    fn is_initialized(&self) -> bool {
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    ::protobuf::rt::read_singular_proto3_bytes_into(wire_type, is, &mut self.sender)?;
                },
                2 => {
                    ::protobuf::rt::read_singular_proto3_bytes_into(wire_type, is, &mut self.wasm_byte_code)?;
                },
                3 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.source)?;
                },
                4 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.builder)?;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        if !self.sender.is_empty() {
            my_size += ::protobuf::rt::bytes_size(1, &self.sender);
        }
        if !self.wasm_byte_code.is_empty() {
            my_size += ::protobuf::rt::bytes_size(2, &self.wasm_byte_code);
        }
        if !self.source.is_empty() {
            my_size += ::protobuf::rt::string_size(3, &self.source);
        }
        if !self.builder.is_empty() {
            my_size += ::protobuf::rt::string_size(4, &self.builder);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::ProtobufResult<()> {
        if !self.sender.is_empty() {
            os.write_bytes(1, &self.sender)?;
        }
        if !self.wasm_byte_code.is_empty() {
            os.write_bytes(2, &self.wasm_byte_code)?;
        }
        if !self.source.is_empty() {
            os.write_string(3, &self.source)?;
        }
        if !self.builder.is_empty() {
            os.write_string(4, &self.builder)?;
        }
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &dyn (::std::any::Any) {
        self as &dyn (::std::any::Any)
    }
    fn as_any_mut(&mut self) -> &mut dyn (::std::any::Any) {
        self as &mut dyn (::std::any::Any)
    }
    fn into_any(self: ::std::boxed::Box<Self>) -> ::std::boxed::Box<dyn (::std::any::Any)> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        Self::descriptor_static()
    }

    fn new() -> MsgStoreCode {
        MsgStoreCode::new()
    }

    fn descriptor_static() -> &'static ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::LazyV2<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::LazyV2::INIT;
        descriptor.get(|| {
            let mut fields = ::std::vec::Vec::new();
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBytes>(
                "sender",
                |m: &MsgStoreCode| { &m.sender },
                |m: &mut MsgStoreCode| { &mut m.sender },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBytes>(
                "wasm_byte_code",
                |m: &MsgStoreCode| { &m.wasm_byte_code },
                |m: &mut MsgStoreCode| { &mut m.wasm_byte_code },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                "source",
                |m: &MsgStoreCode| { &m.source },
                |m: &mut MsgStoreCode| { &mut m.source },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                "builder",
                |m: &MsgStoreCode| { &m.builder },
                |m: &mut MsgStoreCode| { &mut m.builder },
            ));
            ::protobuf::reflect::MessageDescriptor::new_pb_name::<MsgStoreCode>(
                "MsgStoreCode",
                fields,
                file_descriptor_proto()
            )
        })
    }

    fn default_instance() -> &'static MsgStoreCode {
        static instance: ::protobuf::rt::LazyV2<MsgStoreCode> = ::protobuf::rt::LazyV2::INIT;
        instance.get(MsgStoreCode::new)
    }
}

impl ::protobuf::Clear for MsgStoreCode {
    fn clear(&mut self) {
        self.sender.clear();
        self.wasm_byte_code.clear();
        self.source.clear();
        self.builder.clear();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for MsgStoreCode {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for MsgStoreCode {
    fn as_ref(&self) -> ::protobuf::reflect::ReflectValueRef {
        ::protobuf::reflect::ReflectValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct MsgInstantiateContract {
    // message fields
    pub sender: ::std::vec::Vec<u8>,
    pub callback_code_hash: ::std::string::String,
    pub code_id: u64,
    pub label: ::std::string::String,
    pub init_msg: ::std::vec::Vec<u8>,
    pub init_funds: ::protobuf::RepeatedField<super::coin::Coin>,
    pub callback_sig: ::std::vec::Vec<u8>,
    // special fields
    pub unknown_fields: ::protobuf::UnknownFields,
    pub cached_size: ::protobuf::CachedSize,
}

impl<'a> ::std::default::Default for &'a MsgInstantiateContract {
    fn default() -> &'a MsgInstantiateContract {
        <MsgInstantiateContract as ::protobuf::Message>::default_instance()
    }
}

impl MsgInstantiateContract {
    pub fn new() -> MsgInstantiateContract {
        ::std::default::Default::default()
    }

    // bytes sender = 1;


    pub fn get_sender(&self) -> &[u8] {
        &self.sender
    }
    pub fn clear_sender(&mut self) {
        self.sender.clear();
    }

    // Param is passed by value, moved
    pub fn set_sender(&mut self, v: ::std::vec::Vec<u8>) {
        self.sender = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_sender(&mut self) -> &mut ::std::vec::Vec<u8> {
        &mut self.sender
    }

    // Take field
    pub fn take_sender(&mut self) -> ::std::vec::Vec<u8> {
        ::std::mem::replace(&mut self.sender, ::std::vec::Vec::new())
    }

    // string callback_code_hash = 2;


    pub fn get_callback_code_hash(&self) -> &str {
        &self.callback_code_hash
    }
    pub fn clear_callback_code_hash(&mut self) {
        self.callback_code_hash.clear();
    }

    // Param is passed by value, moved
    pub fn set_callback_code_hash(&mut self, v: ::std::string::String) {
        self.callback_code_hash = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_callback_code_hash(&mut self) -> &mut ::std::string::String {
        &mut self.callback_code_hash
    }

    // Take field
    pub fn take_callback_code_hash(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.callback_code_hash, ::std::string::String::new())
    }

    // uint64 code_id = 3;


    pub fn get_code_id(&self) -> u64 {
        self.code_id
    }
    pub fn clear_code_id(&mut self) {
        self.code_id = 0;
    }

    // Param is passed by value, moved
    pub fn set_code_id(&mut self, v: u64) {
        self.code_id = v;
    }

    // string label = 4;


    pub fn get_label(&self) -> &str {
        &self.label
    }
    pub fn clear_label(&mut self) {
        self.label.clear();
    }

    // Param is passed by value, moved
    pub fn set_label(&mut self, v: ::std::string::String) {
        self.label = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_label(&mut self) -> &mut ::std::string::String {
        &mut self.label
    }

    // Take field
    pub fn take_label(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.label, ::std::string::String::new())
    }

    // bytes init_msg = 5;


    pub fn get_init_msg(&self) -> &[u8] {
        &self.init_msg
    }
    pub fn clear_init_msg(&mut self) {
        self.init_msg.clear();
    }

    // Param is passed by value, moved
    pub fn set_init_msg(&mut self, v: ::std::vec::Vec<u8>) {
        self.init_msg = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_init_msg(&mut self) -> &mut ::std::vec::Vec<u8> {
        &mut self.init_msg
    }

    // Take field
    pub fn take_init_msg(&mut self) -> ::std::vec::Vec<u8> {
        ::std::mem::replace(&mut self.init_msg, ::std::vec::Vec::new())
    }

    // repeated .cosmos.base.v1beta1.Coin init_funds = 6;


    pub fn get_init_funds(&self) -> &[super::coin::Coin] {
        &self.init_funds
    }
    pub fn clear_init_funds(&mut self) {
        self.init_funds.clear();
    }

    // Param is passed by value, moved
    pub fn set_init_funds(&mut self, v: ::protobuf::RepeatedField<super::coin::Coin>) {
        self.init_funds = v;
    }

    // Mutable pointer to the field.
    pub fn mut_init_funds(&mut self) -> &mut ::protobuf::RepeatedField<super::coin::Coin> {
        &mut self.init_funds
    }

    // Take field
    pub fn take_init_funds(&mut self) -> ::protobuf::RepeatedField<super::coin::Coin> {
        ::std::mem::replace(&mut self.init_funds, ::protobuf::RepeatedField::new())
    }

    // bytes callback_sig = 7;


    pub fn get_callback_sig(&self) -> &[u8] {
        &self.callback_sig
    }
    pub fn clear_callback_sig(&mut self) {
        self.callback_sig.clear();
    }

    // Param is passed by value, moved
    pub fn set_callback_sig(&mut self, v: ::std::vec::Vec<u8>) {
        self.callback_sig = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_callback_sig(&mut self) -> &mut ::std::vec::Vec<u8> {
        &mut self.callback_sig
    }

    // Take field
    pub fn take_callback_sig(&mut self) -> ::std::vec::Vec<u8> {
        ::std::mem::replace(&mut self.callback_sig, ::std::vec::Vec::new())
    }
}

impl ::protobuf::Message for MsgInstantiateContract {
    fn is_initialized(&self) -> bool {
        for v in &self.init_funds {
            if !v.is_initialized() {
                return false;
            }
        };
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    ::protobuf::rt::read_singular_proto3_bytes_into(wire_type, is, &mut self.sender)?;
                },
                2 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.callback_code_hash)?;
                },
                3 => {
                    if wire_type != ::protobuf::wire_format::WireTypeVarint {
                        return ::std::result::Result::Err(::protobuf::rt::unexpected_wire_type(wire_type));
                    }
                    let tmp = is.read_uint64()?;
                    self.code_id = tmp;
                },
                4 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.label)?;
                },
                5 => {
                    ::protobuf::rt::read_singular_proto3_bytes_into(wire_type, is, &mut self.init_msg)?;
                },
                6 => {
                    ::protobuf::rt::read_repeated_message_into(wire_type, is, &mut self.init_funds)?;
                },
                7 => {
                    ::protobuf::rt::read_singular_proto3_bytes_into(wire_type, is, &mut self.callback_sig)?;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        if !self.sender.is_empty() {
            my_size += ::protobuf::rt::bytes_size(1, &self.sender);
        }
        if !self.callback_code_hash.is_empty() {
            my_size += ::protobuf::rt::string_size(2, &self.callback_code_hash);
        }
        if self.code_id != 0 {
            my_size += ::protobuf::rt::value_size(3, self.code_id, ::protobuf::wire_format::WireTypeVarint);
        }
        if !self.label.is_empty() {
            my_size += ::protobuf::rt::string_size(4, &self.label);
        }
        if !self.init_msg.is_empty() {
            my_size += ::protobuf::rt::bytes_size(5, &self.init_msg);
        }
        for value in &self.init_funds {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        };
        if !self.callback_sig.is_empty() {
            my_size += ::protobuf::rt::bytes_size(7, &self.callback_sig);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::ProtobufResult<()> {
        if !self.sender.is_empty() {
            os.write_bytes(1, &self.sender)?;
        }
        if !self.callback_code_hash.is_empty() {
            os.write_string(2, &self.callback_code_hash)?;
        }
        if self.code_id != 0 {
            os.write_uint64(3, self.code_id)?;
        }
        if !self.label.is_empty() {
            os.write_string(4, &self.label)?;
        }
        if !self.init_msg.is_empty() {
            os.write_bytes(5, &self.init_msg)?;
        }
        for v in &self.init_funds {
            os.write_tag(6, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        };
        if !self.callback_sig.is_empty() {
            os.write_bytes(7, &self.callback_sig)?;
        }
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &dyn (::std::any::Any) {
        self as &dyn (::std::any::Any)
    }
    fn as_any_mut(&mut self) -> &mut dyn (::std::any::Any) {
        self as &mut dyn (::std::any::Any)
    }
    fn into_any(self: ::std::boxed::Box<Self>) -> ::std::boxed::Box<dyn (::std::any::Any)> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        Self::descriptor_static()
    }

    fn new() -> MsgInstantiateContract {
        MsgInstantiateContract::new()
    }

    fn descriptor_static() -> &'static ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::LazyV2<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::LazyV2::INIT;
        descriptor.get(|| {
            let mut fields = ::std::vec::Vec::new();
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBytes>(
                "sender",
                |m: &MsgInstantiateContract| { &m.sender },
                |m: &mut MsgInstantiateContract| { &mut m.sender },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                "callback_code_hash",
                |m: &MsgInstantiateContract| { &m.callback_code_hash },
                |m: &mut MsgInstantiateContract| { &mut m.callback_code_hash },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeUint64>(
                "code_id",
                |m: &MsgInstantiateContract| { &m.code_id },
                |m: &mut MsgInstantiateContract| { &mut m.code_id },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                "label",
                |m: &MsgInstantiateContract| { &m.label },
                |m: &mut MsgInstantiateContract| { &mut m.label },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBytes>(
                "init_msg",
                |m: &MsgInstantiateContract| { &m.init_msg },
                |m: &mut MsgInstantiateContract| { &mut m.init_msg },
            ));
            fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::coin::Coin>>(
                "init_funds",
                |m: &MsgInstantiateContract| { &m.init_funds },
                |m: &mut MsgInstantiateContract| { &mut m.init_funds },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBytes>(
                "callback_sig",
                |m: &MsgInstantiateContract| { &m.callback_sig },
                |m: &mut MsgInstantiateContract| { &mut m.callback_sig },
            ));
            ::protobuf::reflect::MessageDescriptor::new_pb_name::<MsgInstantiateContract>(
                "MsgInstantiateContract",
                fields,
                file_descriptor_proto()
            )
        })
    }

    fn default_instance() -> &'static MsgInstantiateContract {
        static instance: ::protobuf::rt::LazyV2<MsgInstantiateContract> = ::protobuf::rt::LazyV2::INIT;
        instance.get(MsgInstantiateContract::new)
    }
}

impl ::protobuf::Clear for MsgInstantiateContract {
    fn clear(&mut self) {
        self.sender.clear();
        self.callback_code_hash.clear();
        self.code_id = 0;
        self.label.clear();
        self.init_msg.clear();
        self.init_funds.clear();
        self.callback_sig.clear();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for MsgInstantiateContract {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for MsgInstantiateContract {
    fn as_ref(&self) -> ::protobuf::reflect::ReflectValueRef {
        ::protobuf::reflect::ReflectValueRef::Message(self)
    }
}

#[derive(PartialEq,Clone,Default)]
pub struct MsgExecuteContract {
    // message fields
    pub sender: ::std::vec::Vec<u8>,
    pub contract: ::std::vec::Vec<u8>,
    pub msg: ::std::vec::Vec<u8>,
    pub callback_code_hash: ::std::string::String,
    pub sent_funds: ::protobuf::RepeatedField<super::coin::Coin>,
    pub callback_sig: ::std::vec::Vec<u8>,
    // special fields
    pub unknown_fields: ::protobuf::UnknownFields,
    pub cached_size: ::protobuf::CachedSize,
}

impl<'a> ::std::default::Default for &'a MsgExecuteContract {
    fn default() -> &'a MsgExecuteContract {
        <MsgExecuteContract as ::protobuf::Message>::default_instance()
    }
}

impl MsgExecuteContract {
    pub fn new() -> MsgExecuteContract {
        ::std::default::Default::default()
    }

    // bytes sender = 1;


    pub fn get_sender(&self) -> &[u8] {
        &self.sender
    }
    pub fn clear_sender(&mut self) {
        self.sender.clear();
    }

    // Param is passed by value, moved
    pub fn set_sender(&mut self, v: ::std::vec::Vec<u8>) {
        self.sender = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_sender(&mut self) -> &mut ::std::vec::Vec<u8> {
        &mut self.sender
    }

    // Take field
    pub fn take_sender(&mut self) -> ::std::vec::Vec<u8> {
        ::std::mem::replace(&mut self.sender, ::std::vec::Vec::new())
    }

    // bytes contract = 2;


    pub fn get_contract(&self) -> &[u8] {
        &self.contract
    }
    pub fn clear_contract(&mut self) {
        self.contract.clear();
    }

    // Param is passed by value, moved
    pub fn set_contract(&mut self, v: ::std::vec::Vec<u8>) {
        self.contract = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_contract(&mut self) -> &mut ::std::vec::Vec<u8> {
        &mut self.contract
    }

    // Take field
    pub fn take_contract(&mut self) -> ::std::vec::Vec<u8> {
        ::std::mem::replace(&mut self.contract, ::std::vec::Vec::new())
    }

    // bytes msg = 3;


    pub fn get_msg(&self) -> &[u8] {
        &self.msg
    }
    pub fn clear_msg(&mut self) {
        self.msg.clear();
    }

    // Param is passed by value, moved
    pub fn set_msg(&mut self, v: ::std::vec::Vec<u8>) {
        self.msg = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_msg(&mut self) -> &mut ::std::vec::Vec<u8> {
        &mut self.msg
    }

    // Take field
    pub fn take_msg(&mut self) -> ::std::vec::Vec<u8> {
        ::std::mem::replace(&mut self.msg, ::std::vec::Vec::new())
    }

    // string callback_code_hash = 4;


    pub fn get_callback_code_hash(&self) -> &str {
        &self.callback_code_hash
    }
    pub fn clear_callback_code_hash(&mut self) {
        self.callback_code_hash.clear();
    }

    // Param is passed by value, moved
    pub fn set_callback_code_hash(&mut self, v: ::std::string::String) {
        self.callback_code_hash = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_callback_code_hash(&mut self) -> &mut ::std::string::String {
        &mut self.callback_code_hash
    }

    // Take field
    pub fn take_callback_code_hash(&mut self) -> ::std::string::String {
        ::std::mem::replace(&mut self.callback_code_hash, ::std::string::String::new())
    }

    // repeated .cosmos.base.v1beta1.Coin sent_funds = 5;


    pub fn get_sent_funds(&self) -> &[super::coin::Coin] {
        &self.sent_funds
    }
    pub fn clear_sent_funds(&mut self) {
        self.sent_funds.clear();
    }

    // Param is passed by value, moved
    pub fn set_sent_funds(&mut self, v: ::protobuf::RepeatedField<super::coin::Coin>) {
        self.sent_funds = v;
    }

    // Mutable pointer to the field.
    pub fn mut_sent_funds(&mut self) -> &mut ::protobuf::RepeatedField<super::coin::Coin> {
        &mut self.sent_funds
    }

    // Take field
    pub fn take_sent_funds(&mut self) -> ::protobuf::RepeatedField<super::coin::Coin> {
        ::std::mem::replace(&mut self.sent_funds, ::protobuf::RepeatedField::new())
    }

    // bytes callback_sig = 6;


    pub fn get_callback_sig(&self) -> &[u8] {
        &self.callback_sig
    }
    pub fn clear_callback_sig(&mut self) {
        self.callback_sig.clear();
    }

    // Param is passed by value, moved
    pub fn set_callback_sig(&mut self, v: ::std::vec::Vec<u8>) {
        self.callback_sig = v;
    }

    // Mutable pointer to the field.
    // If field is not initialized, it is initialized with default value first.
    pub fn mut_callback_sig(&mut self) -> &mut ::std::vec::Vec<u8> {
        &mut self.callback_sig
    }

    // Take field
    pub fn take_callback_sig(&mut self) -> ::std::vec::Vec<u8> {
        ::std::mem::replace(&mut self.callback_sig, ::std::vec::Vec::new())
    }
}

impl ::protobuf::Message for MsgExecuteContract {
    fn is_initialized(&self) -> bool {
        for v in &self.sent_funds {
            if !v.is_initialized() {
                return false;
            }
        };
        true
    }

    fn merge_from(&mut self, is: &mut ::protobuf::CodedInputStream<'_>) -> ::protobuf::ProtobufResult<()> {
        while !is.eof()? {
            let (field_number, wire_type) = is.read_tag_unpack()?;
            match field_number {
                1 => {
                    ::protobuf::rt::read_singular_proto3_bytes_into(wire_type, is, &mut self.sender)?;
                },
                2 => {
                    ::protobuf::rt::read_singular_proto3_bytes_into(wire_type, is, &mut self.contract)?;
                },
                3 => {
                    ::protobuf::rt::read_singular_proto3_bytes_into(wire_type, is, &mut self.msg)?;
                },
                4 => {
                    ::protobuf::rt::read_singular_proto3_string_into(wire_type, is, &mut self.callback_code_hash)?;
                },
                5 => {
                    ::protobuf::rt::read_repeated_message_into(wire_type, is, &mut self.sent_funds)?;
                },
                6 => {
                    ::protobuf::rt::read_singular_proto3_bytes_into(wire_type, is, &mut self.callback_sig)?;
                },
                _ => {
                    ::protobuf::rt::read_unknown_or_skip_group(field_number, wire_type, is, self.mut_unknown_fields())?;
                },
            };
        }
        ::std::result::Result::Ok(())
    }

    // Compute sizes of nested messages
    #[allow(unused_variables)]
    fn compute_size(&self) -> u32 {
        let mut my_size = 0;
        if !self.sender.is_empty() {
            my_size += ::protobuf::rt::bytes_size(1, &self.sender);
        }
        if !self.contract.is_empty() {
            my_size += ::protobuf::rt::bytes_size(2, &self.contract);
        }
        if !self.msg.is_empty() {
            my_size += ::protobuf::rt::bytes_size(3, &self.msg);
        }
        if !self.callback_code_hash.is_empty() {
            my_size += ::protobuf::rt::string_size(4, &self.callback_code_hash);
        }
        for value in &self.sent_funds {
            let len = value.compute_size();
            my_size += 1 + ::protobuf::rt::compute_raw_varint32_size(len) + len;
        };
        if !self.callback_sig.is_empty() {
            my_size += ::protobuf::rt::bytes_size(6, &self.callback_sig);
        }
        my_size += ::protobuf::rt::unknown_fields_size(self.get_unknown_fields());
        self.cached_size.set(my_size);
        my_size
    }

    fn write_to_with_cached_sizes(&self, os: &mut ::protobuf::CodedOutputStream<'_>) -> ::protobuf::ProtobufResult<()> {
        if !self.sender.is_empty() {
            os.write_bytes(1, &self.sender)?;
        }
        if !self.contract.is_empty() {
            os.write_bytes(2, &self.contract)?;
        }
        if !self.msg.is_empty() {
            os.write_bytes(3, &self.msg)?;
        }
        if !self.callback_code_hash.is_empty() {
            os.write_string(4, &self.callback_code_hash)?;
        }
        for v in &self.sent_funds {
            os.write_tag(5, ::protobuf::wire_format::WireTypeLengthDelimited)?;
            os.write_raw_varint32(v.get_cached_size())?;
            v.write_to_with_cached_sizes(os)?;
        };
        if !self.callback_sig.is_empty() {
            os.write_bytes(6, &self.callback_sig)?;
        }
        os.write_unknown_fields(self.get_unknown_fields())?;
        ::std::result::Result::Ok(())
    }

    fn get_cached_size(&self) -> u32 {
        self.cached_size.get()
    }

    fn get_unknown_fields(&self) -> &::protobuf::UnknownFields {
        &self.unknown_fields
    }

    fn mut_unknown_fields(&mut self) -> &mut ::protobuf::UnknownFields {
        &mut self.unknown_fields
    }

    fn as_any(&self) -> &dyn (::std::any::Any) {
        self as &dyn (::std::any::Any)
    }
    fn as_any_mut(&mut self) -> &mut dyn (::std::any::Any) {
        self as &mut dyn (::std::any::Any)
    }
    fn into_any(self: ::std::boxed::Box<Self>) -> ::std::boxed::Box<dyn (::std::any::Any)> {
        self
    }

    fn descriptor(&self) -> &'static ::protobuf::reflect::MessageDescriptor {
        Self::descriptor_static()
    }

    fn new() -> MsgExecuteContract {
        MsgExecuteContract::new()
    }

    fn descriptor_static() -> &'static ::protobuf::reflect::MessageDescriptor {
        static descriptor: ::protobuf::rt::LazyV2<::protobuf::reflect::MessageDescriptor> = ::protobuf::rt::LazyV2::INIT;
        descriptor.get(|| {
            let mut fields = ::std::vec::Vec::new();
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBytes>(
                "sender",
                |m: &MsgExecuteContract| { &m.sender },
                |m: &mut MsgExecuteContract| { &mut m.sender },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBytes>(
                "contract",
                |m: &MsgExecuteContract| { &m.contract },
                |m: &mut MsgExecuteContract| { &mut m.contract },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBytes>(
                "msg",
                |m: &MsgExecuteContract| { &m.msg },
                |m: &mut MsgExecuteContract| { &mut m.msg },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeString>(
                "callback_code_hash",
                |m: &MsgExecuteContract| { &m.callback_code_hash },
                |m: &mut MsgExecuteContract| { &mut m.callback_code_hash },
            ));
            fields.push(::protobuf::reflect::accessor::make_repeated_field_accessor::<_, ::protobuf::types::ProtobufTypeMessage<super::coin::Coin>>(
                "sent_funds",
                |m: &MsgExecuteContract| { &m.sent_funds },
                |m: &mut MsgExecuteContract| { &mut m.sent_funds },
            ));
            fields.push(::protobuf::reflect::accessor::make_simple_field_accessor::<_, ::protobuf::types::ProtobufTypeBytes>(
                "callback_sig",
                |m: &MsgExecuteContract| { &m.callback_sig },
                |m: &mut MsgExecuteContract| { &mut m.callback_sig },
            ));
            ::protobuf::reflect::MessageDescriptor::new_pb_name::<MsgExecuteContract>(
                "MsgExecuteContract",
                fields,
                file_descriptor_proto()
            )
        })
    }

    fn default_instance() -> &'static MsgExecuteContract {
        static instance: ::protobuf::rt::LazyV2<MsgExecuteContract> = ::protobuf::rt::LazyV2::INIT;
        instance.get(MsgExecuteContract::new)
    }
}

impl ::protobuf::Clear for MsgExecuteContract {
    fn clear(&mut self) {
        self.sender.clear();
        self.contract.clear();
        self.msg.clear();
        self.callback_code_hash.clear();
        self.sent_funds.clear();
        self.callback_sig.clear();
        self.unknown_fields.clear();
    }
}

impl ::std::fmt::Debug for MsgExecuteContract {
    fn fmt(&self, f: &mut ::std::fmt::Formatter<'_>) -> ::std::fmt::Result {
        ::protobuf::text_format::fmt(self, f)
    }
}

impl ::protobuf::reflect::ProtobufValue for MsgExecuteContract {
    fn as_ref(&self) -> ::protobuf::reflect::ReflectValueRef {
        ::protobuf::reflect::ReflectValueRef::Message(self)
    }
}

static file_descriptor_proto_data: &'static [u8] = b"\
    \n\x20secret/compute/v1beta1/msg.proto\x12\x16secret.compute.v1beta1\x1a\
    \x14gogoproto/gogo.proto\x1a\x1ecosmos/base/v1beta1/coin.proto\"\xc9\x01\
    \n\x0cMsgStoreCode\x12I\n\x06sender\x18\x01\x20\x01(\x0cR\x06senderB1\
    \xfa\xde\x1f-github.com/cosmos/cosmos-sdk/types.AccAddress\x126\n\x0ewas\
    m_byte_code\x18\x02\x20\x01(\x0cR\x0cwasmByteCodeB\x10\xe2\xde\x1f\x0cWA\
    SMByteCode\x12\x16\n\x06source\x18\x03\x20\x01(\tR\x06source\x12\x18\n\
    \x07builder\x18\x04\x20\x01(\tR\x07builder:\x04\x88\xa0\x1f\0\"\x8d\x03\
    \n\x16MsgInstantiateContract\x12I\n\x06sender\x18\x01\x20\x01(\x0cR\x06s\
    enderB1\xfa\xde\x1f-github.com/cosmos/cosmos-sdk/types.AccAddress\x12,\n\
    \x12callback_code_hash\x18\x02\x20\x01(\tR\x10callbackCodeHash\x12#\n\
    \x07code_id\x18\x03\x20\x01(\x04R\x06codeIdB\n\xe2\xde\x1f\x06CodeID\x12\
    \x14\n\x05label\x18\x04\x20\x01(\tR\x05label\x12\x19\n\x08init_msg\x18\
    \x05\x20\x01(\x0cR\x07initMsg\x12j\n\ninit_funds\x18\x06\x20\x03(\x0b2\
    \x19.cosmos.base.v1beta1.CoinR\tinitFundsB0\xaa\xdf\x1f(github.com/cosmo\
    s/cosmos-sdk/types.Coins\xc8\xde\x1f\0\x122\n\x0ccallback_sig\x18\x07\
    \x20\x01(\x0cR\x0bcallbackSigB\x0f\xe2\xde\x1f\x0bCallbackSig:\x04\x88\
    \xa0\x1f\0\"\x94\x03\n\x12MsgExecuteContract\x12I\n\x06sender\x18\x01\
    \x20\x01(\x0cR\x06senderB1\xfa\xde\x1f-github.com/cosmos/cosmos-sdk/type\
    s.AccAddress\x12M\n\x08contract\x18\x02\x20\x01(\x0cR\x08contractB1\xfa\
    \xde\x1f-github.com/cosmos/cosmos-sdk/types.AccAddress\x12\x10\n\x03msg\
    \x18\x03\x20\x01(\x0cR\x03msg\x12,\n\x12callback_code_hash\x18\x04\x20\
    \x01(\tR\x10callbackCodeHash\x12j\n\nsent_funds\x18\x05\x20\x03(\x0b2\
    \x19.cosmos.base.v1beta1.CoinR\tsentFundsB0\xaa\xdf\x1f(github.com/cosmo\
    s/cosmos-sdk/types.Coins\xc8\xde\x1f\0\x122\n\x0ccallback_sig\x18\x06\
    \x20\x01(\x0cR\x0bcallbackSigB\x0f\xe2\xde\x1f\x0bCallbackSig:\x04\x88\
    \xa0\x1f\0B=Z;github.com/enigmampc/SecretNetwork/x/compute/internal/type\
    sb\x06proto3\
";

static file_descriptor_proto_lazy: ::protobuf::rt::LazyV2<::protobuf::descriptor::FileDescriptorProto> = ::protobuf::rt::LazyV2::INIT;

fn parse_descriptor_proto() -> ::protobuf::descriptor::FileDescriptorProto {
    ::protobuf::Message::parse_from_bytes(file_descriptor_proto_data).unwrap()
}

pub fn file_descriptor_proto() -> &'static ::protobuf::descriptor::FileDescriptorProto {
    file_descriptor_proto_lazy.get(|| {
        parse_descriptor_proto()
    })
}
